import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import User  from '../../../models/user'
import Passport from 'passport'

const passport = (key, trx) => {

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('Bearer'), ExtractJwt.fromUrlQueryParameter('token')]),
    secretOrKey: process.env.SECRET || ''
  }

  Passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {

    if(!payload.data[key]) return done(null, false, { message: 'invalid jwt' })

    const id = payload.data[key]

    const user = await User.where({ id }).fetch({ withRelated: ['photo','team'], transacting: trx })

    if(!user) return done(null, false, { message: 'cannot find user' })

    done(null, user, payload)

  }))

  Passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

    const user = await User.where({ email }).fetch({ transacting: trx})

    if(!user) return done(null, false, { message: 'cannot find user' })

    if(!user.authenticate(password)) return done(null, false, { message: 'invalid password' })

    done(null, user)

  }))

  return Passport

}

export default passport
