import { type Express } from 'express'
import { Passport } from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { getAccountById } from '../mongodb/account/AcoountRepository'
import { type AppContext } from './ctx'
import { env } from './env'

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport()

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayload: string, done) => {
        getAccountById(jwtPayload)
          .then((account) => {
            done(null, account)
          })
          .catch((error) => {
            done(error, false)
          })
      }
    )
  )

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next()
      return
    }
    passport.authenticate('jwt', { session: false }, (...args: any[]) => {
      req.user = args[1] || undefined
      next()
    })(req, res, next)
  })
}
