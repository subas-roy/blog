import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// aplication routes
app.use('/api/auth/', userRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
