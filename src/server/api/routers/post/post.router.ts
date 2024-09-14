import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { postService } from "./post.service";
import { insertSchema } from "@/server/db/schema/posts";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  latestPost: publicProcedure.query(async () => {
    const posts = await postService.getLatestPost();
    return posts;
  }),

  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const post = await postService.getPostById(input);
    return post;
  }),

  create: protectedProcedure.input(insertSchema).mutation(async ({ input }) => {
    const post = await postService.createNewPost(input);
    return post;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: insertSchema.partial(),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedPost = await postService.updatePost(input.id, input.data);
      return updatedPost;
    }),

  delete: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
    const isDeleted = await postService.deletePost(input);
    return { success: isDeleted };
  }),
});
