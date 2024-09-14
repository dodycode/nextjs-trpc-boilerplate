import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import NavbarClientComponent from "./navbar";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <NavbarClientComponent session={session} />
    </HydrateClient>
  );
}
