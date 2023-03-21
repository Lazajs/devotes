import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { dbConnect } from "@/db/connect";
import { withIronSessionApiRoute } from "iron-session/next";
import config from "@/lib/ironConfig";
import { User } from "@/types";

async function handler (req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  await new Promise<void>(resolve => (
      passport.authenticate('linkedin', async (err: any, user: User) => {
        if (err || !user) {
          console.log('Error while logging in with Linkedin', err)
          resolve()
        } else {
          console.log(user)
          req.session.user = user
          await req.session.save()
          resolve()
        }
      })(req,res)
    )
  )

  if (req.session?.user) {
    res.redirect('/').end()
  } else {
    res.redirect('/auth/register').end()
  }
}

export default withIronSessionApiRoute(handler, config)