import type { NextRequest } from "next/server";

import { handlers } from "@/server/auth";

export const POST = async (req: NextRequest) => {
  return handlers.POST(req);
};

export const GET = async (req: NextRequest) => {
  return handlers.GET(req);
};
