import * as express from 'express';
import * as Knex from 'knex';
import { knexConfig } from 'config/knexfile';
import { PORT, SERVICE_NAME } from 'config/dotenv';
import { UserService } from 'services/UserService';
import { UserRouter } from 'routers/UserRouter';
import { ProductService } from 'services/ProductService';
import { ProductRouter } from 'routers/ProductRouter';
import { jwtAuth } from 'guard';
import * as cors from 'cors';

const knexInstance = Knex(knexConfig);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userService = new UserService();
const userRouter = new UserRouter(userService);
const productService = new ProductService(knexInstance);
const productRouter = new ProductRouter(productService);

app.use('/user', userRouter.router());
app.use('/', jwtAuth, productRouter.router());

app.listen(PORT, () =>
  console.log(`${SERVICE_NAME} is listening on port ${PORT}`)
);
