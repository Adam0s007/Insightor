import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Jeśli exception jest instancją HttpException, użyj jej statusu. W przeciwnym razie użyj 500.
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: (status !== HttpStatus.INTERNAL_SERVER_ERROR) 
        ? (exception.message || null) 
        : 'Internal server error',
      
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }

    response.status(status).json(errorResponse);
  }
}
