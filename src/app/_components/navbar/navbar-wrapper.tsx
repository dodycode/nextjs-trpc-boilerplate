import { getServerAuthSession } from "@/server/auth";
import NavbarClientComponent from "./navbar";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <NavbarClientComponent session={session} />
  );
}
