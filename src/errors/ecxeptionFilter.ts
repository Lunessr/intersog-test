import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { INETRNAL_SERVER_ERROR } from '../constants/errors';

@Catch()
export class ErrorExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = {
      statusCode: exception.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception.response?.error || INETRNAL_SERVER_ERROR,
      message: exception.response?.message || exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
