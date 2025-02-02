import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { userService } from "./user.service";

export const userRouter = createTRPCRouter({
  findByEmail: protectedProcedure.query(async ({ input }) => {
    const user = await userService.getByEmail(input!);
    return user;
  }),
});
