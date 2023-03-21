import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import { dbConnect } from "@/db/connect";
import { withIronSessionApiRoute } from "iron-session/next";
import config from "@/lib/ironConfig";
import { User } from "@/types";

async function handler (req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  let error = 'Error while trying to sign in with Github.'
  await new Promise<void>(resolve => (
      passport.authenticate('github', async (err: any, user: User) => {
        if (err || !user) {
          error = err
          resolve()
        } else {
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
    res.redirect(`/auth/login?error=${error}`).end()
  }
}

export default withIronSessionApiRoute(handler, config)