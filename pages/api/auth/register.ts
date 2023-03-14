import {withIronSessionApiRoute} from 'iron-session/next'
import config from '@/lib/ironConfig'
import { dbConnect } from '@/db/connect'
import User from '@/db/models/User'
import bcrypt from 'bcrypt'

export default withIronSessionApiRoute(
  async function registerRoute(req,res) {
    if (req.method === 'POST') {
      await dbConnect()
      const {name, email, password} = req.body
      
      if (!name || !email || !password) res.status(400).end()
      console.log(name,email, password)
      const isUserExistent = await User.find({email, name})
      
      if (Array.isArray(isUserExistent) && isUserExistent.length !== 0) res.status(400).end()
      else {
        const hash = bcrypt.hashSync(password as string, 10)
        const newUser = new User({name, email, passwordHash: hash})
        await newUser.save()

        req.session.user = {name: newUser.name, email: newUser.email, id: newUser._id}
        await req.session.save()
        res.status(201).end()
      }
    }  
  }, config
)