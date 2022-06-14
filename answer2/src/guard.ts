import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import jwt from 'config/jwt';

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwt.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    (payload, done) => {
      const user = payload;
      if (user) {
        return done(null, user);
      } else {
        return done(new Error('User not Found'), null);
      }
    }
  )
);

export const jwtAuth = passport.authenticate('jwt', { session: false });
