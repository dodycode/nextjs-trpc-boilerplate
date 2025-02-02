import { LatestPosts } from "@/app/(main)/posts/_components/latest-posts";
import { ensureAuth } from "@/lib/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function PostsPage() {
  await ensureAuth();

  // Prefetch the latest post on the server
  void api.post.latestPost.prefetch();

  return (
    <HydrateClient>
      <LatestPosts />
    </HydrateClient>
  );
}
