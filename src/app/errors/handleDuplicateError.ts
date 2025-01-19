import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract the email using a simple regex
  const email = err.message.match(/"([^"]+)"/)?.[1];

  const error: TError = [
    {
      path: '',
      message: `${email} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    error,
  };
};

export default handleDuplicateError;
