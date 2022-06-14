import * as express from 'express';
import { UserService } from 'services/UserService';
import { User } from 'config/user';

export class UserRouter {
  constructor(private userService: UserService) {}

  router() {
    const router = express.Router();
    router.post('/login', this.login);
    return router;
  }

  private login: express.RequestHandler<{}, {}, User, {}> = async (
    req,
    res
  ) => {
    try {
      const user = req.body;
      const isValidUser = this.userService.validateUser(user);
      if (!isValidUser) {
        res.status(401).json({
          ok: false,
          message: 'Wrong Username/Password'
        });
        return;
      }
      const token = this.userService.signTokenForUser(user);
      res.json({
        ok: true,
        username: user.username,
        token
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  };
}
