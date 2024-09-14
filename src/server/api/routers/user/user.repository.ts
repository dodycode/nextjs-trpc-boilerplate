import { BaseRepository } from "@/server/common/utils/base-repository";
import { db, type DbConnection } from "@/server/db";
import { users } from "@/server/db/schema/users";
import { eq, InferSelectModel } from "drizzle-orm";

class UserRepository extends BaseRepository<typeof users, "id"> {
  constructor(db: DbConnection) {
    super(db, users, "id");
  }

  // You can add user-specific methods here
  async findByEmail(
    email: string,
  ): Promise<InferSelectModel<typeof users> | null> {
    const result = await this.db
      .select()
      .from(this.schema)
      .where(eq(this.schema.email, email));
    return result[0] || null;
  }
}

export const userRepository = new UserRepository(db);
