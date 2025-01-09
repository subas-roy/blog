import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { blogRoutes } from './app/modules/blog/blog.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// aplication routes
app.use('/api/auth/', userRoutes);
app.use('/api/admin/users/', userRoutes);
app.use('/api/admin/blogs/', blogRoutes);
app.use('/api/blogs/', blogRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
