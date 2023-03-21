import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "@/db/models/User";

const {LINKEDIN_ID, LINKEDIN_SECRET} = process.env

passport.use('linkedin', new LinkedInStrategy({
  clientID: LINKEDIN_ID as string,
  clientSecret: LINKEDIN_SECRET as string,
  callbackURL: 'http://localhost:3000/api/auth/provider/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile']
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const found = await User.findOne({name: profile.displayName, email: profile.emails[0].value})
      if (!found) {
        const newUser = new User({name: profile.displayName, email: profile.emails[0].value, passwordHash: ''})
        await newUser.save()
        const toSendUser = {name: newUser.name, email: newUser.email, id: newUser._id}
        done(null, toSendUser)
      } else {
        const toSendUser = {name: found.name, email: found.email, id: found._id}
        done(null, toSendUser)
      }
    } catch (err) {
      console.error(err)
      done(err, false, {message: 'Internal server error'})
    }
  }
))