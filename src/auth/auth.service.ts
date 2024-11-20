import { UserEntity } from './../users/entities/user.entity';
import { IsEmail } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '.././users/users.service';
import { ManagerError } from 'src/common/errors/manager.error';

@Injectable()
export class AuthService {

  constructor(
    private readonly  jwtService:JwtService,
    private readonly  usersService:UsersService
  ){}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
 async login(loginAuthDto: LoginAuthDto): Promise<{user:UserEntity; token:string;}>  {
  const {email,password} = loginAuthDto 
  try {
    const  user = await this.usersService.findOneByEmail(email)
    if(user.password !==  password){
      throw   new ManagerError({
        type :'BAD_REQUEST',
        message:"Credencials not valid"
      })
      
    }
    const token = this.jwtService.sign({emai: user.email,  id:  user.id}, {secret:process.env.JWT_SECRET})
      if(!token){
        throw new ManagerError({
          type:"NO_CONTENT",
          message:"xdddddddd"
        })
      }
    return {user  ,  token};
   } catch (error) {
    ManagerError.createSignatureError(error.message)
   };
  }
}

