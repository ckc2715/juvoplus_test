import { JWT_SECRET } from 'config/dotenv';

const jwt = {
  jwtSecret: JWT_SECRET,
  jwtSession: {
    session: false
  }
};

export default jwt;
