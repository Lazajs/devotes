import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { dbConnect } from "@/db/connect";
import '@/lib/passport'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  passport.authenticate('linkedin', {
    session: false,
    successRedirect: '/',
    failureRedirect: '/auth/login'
  })(req,res)
}