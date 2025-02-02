import type { InferInsertModel, InferSelectModel, SQL } from "drizzle-orm";
import type { PgColumn, PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core";
import { desc, eq } from "drizzle-orm";

import type { DbConnection } from "@/server/db/client";

export interface QueryCriteria {
  limit?: number;
  offset?: number;
}

export interface IBaseRepository<
  T extends PgTable,
  ID extends keyof T["$inferSelect"],
> {
  findAll(): Promise<InferSelectModel<T>[]>;
  // findAllBy(criteria: QueryCriteria): Promise<InferSelectModel<T>[]>;
  findOne(id: T["$inferSelect"][ID]): Promise<InferSelectModel<T> | null>;
  update(
    id: T["$inferSelect"][ID],
    data: PgUpdateSetSource<T>,
  ): Promise<InferSelectModel<T>>;
  create(data: InferInsertModel<T>): Promise<InferSelectModel<T>>;
  delete(id: T["$inferSelect"][ID]): Promise<void>;
}

export abstract class BaseRepository<
  PG extends PgTable,
  ID extends keyof PG["$inferSelect"],
> implements IBaseRepository<PG, ID>
{
  protected constructor(
    protected readonly db: DbConnection,
    protected readonly schema: PG,
    protected readonly primaryKey: ID & keyof PG,
    protected readonly defaultOrderColumn: keyof PG = "created_at" as keyof PG,
  ) {}

  async create(data: InferInsertModel<PG>): Promise<InferSelectModel<PG>> {
    const result = await this.db.insert(this.schema).values(data).returning();
    return result[0] as InferSelectModel<PG>;
  }

  async delete(id: PG["$inferSelect"][ID]): Promise<void> {
    await this.db.delete(this.schema).where(this.getWhereCondition(id));
  }

  async findAll(): Promise<InferSelectModel<PG>[]> {
    // @ts-expect-error
    const query = this.db.select().from(this.schema);

    if (this.defaultOrderColumn in this.schema) {
      const orderColumn = this.schema[this.defaultOrderColumn] as PgColumn<
        any,
        any,
        any
      >;
      return query.orderBy(desc(orderColumn));
    }

    return query;
  }

  // async findAllBy(criteria: QueryCriteria): Promise<InferSelectModel<PG>[]> {
  //   let query = this.db.select().from(this.schema);
  //   if (criteria.limit !== undefined) {
  //     query = query.limit(criteria.limit) as any;
  //   }
  //   if (criteria.offset !== undefined) {
  //     query = query.offset(criteria.offset) as any;
  //   }
  //   return query as Promise<InferSelectModel<PG>[]>;
  // }

  async findOne(id: PG["$inferSelect"][ID]): Promise<InferSelectModel<PG>> {
    if (!id) {
      throw new Error("Id is required");
    }
    const result = await this.db
      .select()
      //@ts-expect-error
      .from(this.schema)
      .where(this.getWhereCondition(id));
    if (result.length === 0) {
      throw new Error("Entity not found");
    }
    return result[0] as InferSelectModel<PG>;
  }

  async update(
    id: PG["$inferSelect"][ID],
    data: PgUpdateSetSource<PG>,
  ): Promise<InferSelectModel<PG>> {
    await this.findOne(id);
    const result = await this.db
      .update(this.schema)
      .set(data)
      .where(this.getWhereCondition(id))
      .returning();
    //@ts-expect-error
    return result[0] as InferSelectModel<PG>;
  }

  private getWhereCondition(id: PG["$inferSelect"][ID]): SQL<unknown> {
    return eq(this.schema[this.primaryKey] as PgColumn<any>, id);
  }
}
