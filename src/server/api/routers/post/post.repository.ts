import type { DbConnection } from "@/server/db/client";
import { BaseRepository } from "@/server/common/utils/base-repository";
import { db } from "@/server/db/client";
import { posts } from "@/server/db/schema/posts";

class PostRepository extends BaseRepository<typeof posts, "id"> {
  constructor(db: DbConnection) {
    super(db, posts, "id");
  }

  // You can add post-specific methods here
}

export const postRepository = new PostRepository(db);
