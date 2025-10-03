import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { RegisterDto } from 'src/auth/dto/register.dto';
import bcrypt from 'bcrypt';
import { UserRole } from './entities/user.entity';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository){}

    async createUser(registerDto : RegisterDto){
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

    async findByEmail (email : string) {
        return this.userRepo.findByEmail(email);
    }

    async deleteUserByEmail (email : string) {
        
    await this.userRepo.deleteByEmail(email);

    return ResponseUtil.success(email, `Delete User with email ${email} successfully`, HttpStatus.OK) 
    }
}
