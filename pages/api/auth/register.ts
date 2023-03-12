import {withIronSessionApiRoute} from 'iron-session/next'
import config from '@/ironConfig'
import { dbConnect } from '@/db/connect'
import User from '@/db/models/User'

export default withIronSessionApiRoute(
  async function registerRoute(req,res) {
    await dbConnect()
  res.status(200).end()
    // const isFound = await User.find({name })
  }, config
)