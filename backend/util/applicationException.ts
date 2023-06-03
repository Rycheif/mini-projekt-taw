import {Response} from "express";

class ApplicationException {

  public error: any;
  public message: string;

  constructor(error: any, message: string) {
    this.error = error;
    this.message = message;
  }

}

const Errors = {
  BAD_REQUEST: { message: 'BAD_REQUEST', code: 400 },
  NOT_FOUND: { message: 'NOT_FOUND', code: 404 },
  FORBIDDEN: { message: 'FORBIDDEN', code: 403 },
  UNAUTHORIZED: { message: 'UNAUTHORIZED', code: 401 },
  VALIDATION_FAILURE: { message: 'VALIDATION_FAILURE', code: 406 },
  METHOD_NOT_ALLOWED: { message: 'METHOD_NOT_ALLOWED', code: 405 },
  PRECONDITION_FAILED: { message: 'PRECONDITION_FAILED', code: 412 },
  CONFLICT: { message: 'CONFLICT', code: 409 },
  INTERNAL_SERVER_ERROR: { message: 'INTERNAL_SERVER_ERROR', code: 500 },

  is: function(error: any, errorCode?: number): boolean {
    return error instanceof ApplicationException && (errorCode === undefined || error.error === errorCode);
  },

  new: function(code: number, message: string): ApplicationException {
    return new ApplicationException(code, message);
  },

  errorHandler: function(error: any, response: Response): void {
    if (error instanceof ApplicationException) {
      console.log(JSON.stringify(error, null, 4));
      response.status(error.error).send(error.message || error.error.message);
    } else {
      response.sendStatus(500);
    }
  }
};

export default Errors;

