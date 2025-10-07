import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTTokens {
   accessToken: string;
   refreshToken: string;
}

export interface JWTUserPayload {
    _id : string,
    role: UserRole
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

        await this.usersService.registerUser(registerDto);

    }

    async login(loginDto : LoginDto) : Promise<JWTTokens> {
        const { email , password } = loginDto;
        const existingUser = await this.usersService.findByEmail(email);
        if(!existingUser) {
            throw new HttpException('Invalid Credentials', 400);
        }

        const validPassword = await compare(password , existingUser.password);

        if(!validPassword) {
             throw new HttpException('Invalid Credentials', 400);
        }

        return this.getTokens({
            _id : existingUser._id.toString(),
            role : existingUser.role
        });
    }

    private async getTokens(user : JWTUserPayload) : Promise<JWTTokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub : user._id.toString(),
                role : user.role
            },{
                secret : this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn : this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION')
            }),
            this.jwtService.signAsync({
                sub : user._id,
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
            const { sub : _id } = await this.jwtService.verifyAsync(token , {
                secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            });
            
            const user = await this.usersService.findById(_id);
            if(!user) {
                throw new HttpException('Invalid Token' , 400);
            }
            return this.getTokens({
                _id : user._id.toString(),
                role : user.role
            });
        } catch (error) {
            console.log(error);
            throw new HttpException('Invalid Token' , 400);
        }
    }
}
