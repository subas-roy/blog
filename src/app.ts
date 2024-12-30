import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// aplication routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
