import passport from "passport";
import User from "@/db/models/User";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GithubStrategy } from 'passport-github2'

const {LINKEDIN_ID, LINKEDIN_SECRET, GITHUB_ID, GITHUB_SECRET} = process.env

passport.use('linkedin', new LinkedInStrategy({
  clientID: LINKEDIN_ID as string,
  clientSecret: LINKEDIN_SECRET as string,
  callbackURL: 'http://localhost:3000/api/auth/provider/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile']
},
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const found = await User.findOne({name: profile.displayName, email: profile.emails[0].value})
      if (!found) {
        const newUser = new User({name: profile.displayName, email: profile.emails[0].value, passwordHash: '', provider: 'linkedin'})
        await newUser.save()
        const toSendUser = {name: newUser.name, email: newUser.email, id: newUser._id}
        done(null, toSendUser)
      } else if (found.provider !== 'linkedin') {
        done('Please sign in with your original credentials', false, {message: 'Please sign in with your original credentials.'})
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

passport.use('github', new GithubStrategy({
  clientID: GITHUB_ID as string,
  clientSecret: GITHUB_SECRET as string,
  callbackURL: 'http://localhost:3000/api/auth/provider/github/callback'
},
  async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
    try {
      const found = await User.findOne({name: profile.displayName, email: profile.emails[0].value})
      if (!found) {
        const newUser = new User({name: profile.displayName, email: profile.emails[0].value, passwordHash: '', provider: 'github'})
        await newUser.save()
        const toSendUser = {name: newUser.name, email: newUser.email, id: newUser._id}
        done(null, toSendUser)
      } else if (found.provider !== 'github') {
        done('Please sign in with your original credentials', false, {message: 'Please sign in with your original credentials.'})
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