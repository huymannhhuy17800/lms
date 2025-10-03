/* eslint-disable */
import { Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserRole } from './entities/user.entity';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('users')
@Role(UserRole.ADMIN)
@UseGuards(AccessTokenGuard, RoleGuard)
export class UsersController {
    constructor(private readonly usersService : UsersService) {}
    
    @Get()
    async findAll() {
        return ResponseUtil.success('success', 'success', HttpStatus.OK);
    }
    
    @Get(':id')
    async findOne() {
        return "This action returns a user by id";
    }


    
    @Post()
    async createUser() {
        return "This action creates a new user";
    }
    
    @Put(':id')
    async updateUser() {
        return "This action updates a user by id";
    }

    
    @Delete(':id')
    async removeUser(@Param('id') email : string) {

        this.usersService.deleteUserByEmail(email);
    }
}
