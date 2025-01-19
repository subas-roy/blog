import { ZodError, ZodIssue } from 'zod';
import { TError } from '../interface/error';

const handleZodError = (err: ZodError) => {
  const error: TError = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleZodError;
