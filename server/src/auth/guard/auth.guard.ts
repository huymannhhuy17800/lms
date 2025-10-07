/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "src/decorators/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector : Reflector){}

   canActivate(context: ExecutionContext): boolean {
    // Take the role from User Role
       const requiredRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
        context.getHandler(),
        context.getClass()
       ]);

       if(!requiredRole) {
        return true;
       }
       const { user } = context.switchToHttp().getRequest();
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
       return user.role === requiredRole; 
       
   }
}