import { withIronSessionApiRoute } from "iron-session/next";
import config from "@/lib/ironConfig";
import { dbConnect } from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from 'bcrypt'

export default withIronSessionApiRoute(
  async function loginRoute (req,res) {
    if (req.method === 'POST') {
      await dbConnect()
      const {email, password} = req.body

      if (!email || !password) res.status(400).end()
      const isUserExistent = await User.find({email})
     
      if (isUserExistent.length === 0) res.status(404).end()
      else if (isUserExistent.length > 0) {
        const {passwordHash, name, _id, email} = isUserExistent[0]
        const unhashed = bcrypt.compareSync(password, passwordHash)

        if (!unhashed) res.status(401).end()
        else {
          req.session.user = {name, email, id: _id}
          await req.session.save()
          res.status(201).end()
        }
      }

    } else res.status(405).end()
  }, config
)