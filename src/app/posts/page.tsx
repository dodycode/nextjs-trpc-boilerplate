import { getServerAuthSession } from "@/server/auth";
import { LatestPosts } from "@/app/_components/latest-posts";

export default async function PostsPage() {
  const session = await getServerAuthSession();

  return <LatestPosts session={session} />;
}
