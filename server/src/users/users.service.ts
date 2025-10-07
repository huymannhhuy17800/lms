import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { RegisterDto } from 'src/auth/dto/register.dto';
import bcrypt from 'bcrypt';
import { UserRole } from './entities/user.entity';
import { ResponseUtil } from 'src/utils/response.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository){}

    async findAll() {
        const users = await this.userRepo.findAll();
        return ResponseUtil.success(users, 'Success', HttpStatus.OK);
    }

    async findOne(id : string) {
        const user = await this.userRepo.findById(id);
        return ResponseUtil.success(user, 'Success', HttpStatus.OK);
    }

    async registerUser(registerDto : RegisterDto){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(registerDto.password, salt);
        return this.userRepo.save({
            email : registerDto.email,
            password : hashPassword,
            role : UserRole.STUDENT,
            firstName : registerDto.firstName,
            lastName : registerDto.lastName,
        });
    }

    async createUser(createUserDto : CreateUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password,salt);

        return this.userRepo.save({
            email: createUserDto.email,
            password: hashedPassword,
            role: createUserDto.role,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName
        })
    }

    async updateUser(id: string, updateUserDto : UpdateUserDto) {
        return this.userRepo.findByIdAndUpdate(id, updateUserDto);
    }

    async findByEmail(email : string) {
        return await this.userRepo.findByEmail(email);
    }

    async findById(id : string) {
        return await this.userRepo.findById(id);
    }

    async deleteUser(id : string) {    
        const deleteUser = await this.userRepo.delete(id);
        return ResponseUtil.success(deleteUser, `Delete user successfully`, HttpStatus.OK) 
    }

    async updateAccountToInstructor(email: string) {
        const updatedUser = await this.userRepo.updateRoleInstructor(email);
        if(updatedUser) {
            return ResponseUtil.success(updatedUser, `Update account email:${email} to INTRUCTOR success`, HttpStatus.OK);
        }

        return ResponseUtil.error(null, `Failed`, HttpStatus.BAD_REQUEST);
    }
}
