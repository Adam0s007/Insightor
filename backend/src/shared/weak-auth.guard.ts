import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WeakAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      try {
        request.user = await this.validateToken(request.headers.authorization);
      } catch (err) {
        console.error(err.message); // Log the error for debugging purposes
      }
    }
    return true; // Always return true to allow the request to proceed
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      return null;
    }
    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
