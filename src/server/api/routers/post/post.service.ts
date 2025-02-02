import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { posts } from "@/server/db/schema/posts";

import { postRepository } from "./post.repository";

class PostService {
  public async getLatestPost() {
    const posts = await postRepository.findAll();
    return posts;
  }

  public async getPostById(id: number) {
    try {
      const post = await postRepository.findOne(id);
      return post;
    } catch (error) {
      console.error("Error getting post:", error);
      return null;
    }
  }

  public async createNewPost(
    input: InferInsertModel<typeof posts> | undefined,
  ): Promise<InferSelectModel<typeof posts> | null> {
    if (!input) return null;

    try {
      const newPost = await postRepository.create(input);
      return newPost;
    } catch (error) {
      console.error("Error creating new post:", error);
      return null;
    }
  }

  public async updatePost(
    id: number,
    input: Partial<InferInsertModel<typeof posts>> | undefined,
  ): Promise<InferSelectModel<typeof posts> | null> {
    if (!input) return null;

    try {
      const updatedPost = await postRepository.update(id, input);
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  public async deletePost(id: number): Promise<boolean> {
    try {
      await postRepository.delete(id);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }
}

export const postService = new PostService();
