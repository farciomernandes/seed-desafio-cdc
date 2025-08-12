import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = (exceptionResponse as any).message || exception.message;
    let detail = (exceptionResponse as any).detail || null;

    if (Array.isArray(message) && status === HttpStatus.BAD_REQUEST) {
      detail = message.join(' ');
      message = 'Validation failed';
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if ((exception as any).cause) {
        detail = (exception as any).cause;
      } else {
        detail = exception.stack;
      }
    }

    response.status(status).json({
      status,
      detail,
      message,
    });
  }
}
