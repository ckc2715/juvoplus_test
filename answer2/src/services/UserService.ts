import { User, USERS } from 'config/user';
import jwtConfig from 'config/jwt';
import * as jwt from 'jsonwebtoken';

export class UserService {
  private users: User[];
  constructor() {
    this.users = USERS;
  }

  validateUser = (user: User) => {
    return (
      this.users.findIndex(
        u => u.username === user.username && u.password === user.password
      ) > -1
    );
  };

  signTokenForUser = (user: User) => {
    const payload = {
      username: user.username,
      iat: Math.floor(Date.now() / 1000)
    };
    const token = jwt.sign(payload, jwtConfig.jwtSecret, {
      expiresIn: '1d'
    });
    return token;
  };
}
