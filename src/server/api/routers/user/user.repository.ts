import type { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

import type { DbConnection } from "@/server/db/client";
import { BaseRepository } from "@/server/common/utils/base-repository";
import { db } from "@/server/db/client";
import { User } from "@/server/db/schema";

class UserRepository extends BaseRepository<typeof User, "id"> {
  constructor(db: DbConnection) {
    super(db, User, "id");
  }

  // You can add user-specific methods here
  async findByEmail(
    email: string,
  ): Promise<InferSelectModel<typeof User> | null> {
    const result = await this.db
      .select()
      .from(this.schema)
      .where(eq(this.schema.email, email));
    return result[0] || null;
  }
}

export const userRepository = new UserRepository(db);
