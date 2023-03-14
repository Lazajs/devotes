import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import ironConfig from "@/lib/ironConfig"


export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, ironConfig)
  const { user } = session

  if (!user?.name) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res;
};

export const config = {
  matcher: "/",
};