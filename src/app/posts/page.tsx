import { getServerAuthSession } from "@/server/auth";
import { LatestPosts } from "@/app/_components/latest-posts";
import { api, HydrateClient } from "@/trpc/server";

export default async function PostsPage() {
  const session = await getServerAuthSession();

  // Prefetch the latest post on the server
  void api.post.latestPost.prefetch();

  return (
    <HydrateClient>
      <LatestPosts session={session} />;
    </HydrateClient>
  );
}
