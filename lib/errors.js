import { PrismaClientKnownRequestError } from '@prisma/client';

export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR';
export const UNIQUE_CONSTRAINT_VALIDATION_ERROR = 'UNIQUE_CONSTRAINT_VALIDATION_ERROR';
export const INCORRECT_CREDENTIALS_ERROR = 'INCORRECT_CREDENTIALS_ERROR';

export function handleError(error) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return {
        statusCode: 400,
        message: {
          error_code: UNIQUE_CONSTRAINT_VALIDATION_ERROR,
          fields: error.meta.target.reduce((obj, field) => {
            obj[field] = 'This value is not available.';
            return obj;
          }, {}),
        },
      };
    }
  }

  if (error.message === UNAUTHORIZED_ERROR) {
    return {
      statusCode: 401,
      message: {
        error_code: UNAUTHORIZED_ERROR,
      },
    };
  }

  return {
    statusCode: 500,
    message: {
      error_code: INTERNAL_SERVER_ERROR,
    },
  };
}
