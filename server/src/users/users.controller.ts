/* eslint-disable */
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserRole } from './entities/user.entity';
import { ResponseUtil } from 'src/utils/response.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
@Role(UserRole.ADMIN)
@UseGuards(AccessTokenGuard, RoleGuard)
@UseInterceptors(CacheInterceptor)
export class UsersController {
    constructor(private readonly usersService : UsersService) {}
    
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    
    @Patch('id')
    updateUser(@Param('id') id: string ,@Body() updateUserDto : UpdateUserDto) { 
        return this.usersService.updateUser(id, updateUserDto);
    }

    
    @Delete(':id')
    removeUser(@Param('id') id : string) {
        this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateInstructorRole(@Param('id') email: string) {
        this.usersService.updateAccountToInstructor(email);
    }

}
