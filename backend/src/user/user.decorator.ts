import {createParamDecorator,ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return data ? request.user[data] : request.user;
});