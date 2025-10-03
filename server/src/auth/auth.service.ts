import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTTokens {
   accessToken: string;
   refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService, 
                private jwtService :JwtService,
                private configService : ConfigService ){}

    async register(registerDto : RegisterDto){
        const existingUser = await this.usersService.findByEmail(registerDto.email);

        if(existingUser){
            throw new HttpException('Email already registered', 400);
        }

        await this.usersService.createUser(registerDto);

    }

    async login(loginDto : LoginDto) : Promise<JWTTokens> {
        const { email , password } = loginDto;
        const existingUser = await this.usersService.findByEmail(loginDto.email);
        if(!existingUser) {
            throw new HttpException('Invalid Credentials', 400);
        }

        const validPassword = await compare(password , existingUser.password);

        if(!validPassword) {
             throw new HttpException('Invalid Credentials', 400);
        }

        return this.getTokens(existingUser);
    }

    private async getTokens(user : User) : Promise<JWTTokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub : user.email,
                role : user.role
            },{
                secret : this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn : this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION')
            }),
            this.jwtService.signAsync({
                sub : user.email,
                role : user.role
            },{
                secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn : this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION')
            })])
    return {accessToken, refreshToken};   
}

    /* eslint-disable*/
    async refreshTokens(token : string) : Promise<JWTTokens> {
        try {
            const { sub : email } = await this.jwtService.verifyAsync(token , {
                secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            });
            
            const user = await this.usersService.findByEmail(email);
            if(!user) {
                throw new HttpException('Invalid Token' , 400);
            }
            return this.getTokens(user);
        } catch (error) {
            console.log(error);
            throw new HttpException('Invalid Token' , 400);
        }
    }
}
