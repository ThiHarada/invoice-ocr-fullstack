import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayloads';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService:JwtService,
      @Inject(refreshConfig.KEY)
      private refreshTokenConfig : ConfigType<typeof refreshConfig>,
    ){}

    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.userService.findUserByName(createUserDto.username);
        if (user) throw new ConflictException('User already exists!');
        return this.userService.create(createUserDto);
      }

      async validateLocaluser(username: string, password: string) {
        const user = await this.userService.findUserByName(username);
        if(!user) throw new UnauthorizedException("User does not exist");
        const passwordMatch = verify(user.password, password);
        if (!passwordMatch) throw new UnauthorizedException("Password is incorrect.");

        return {id: user.id, username:user.username}
    }

    async login(userId:number, username:string){
      const {accessToken, refreshToken} = await this.generateToken(userId)
      const hashedRT = await hash(refreshToken);
      await this.userService.updateHashedRefreshToken(userId, hashedRT)
      return {
        id:userId,
        username: username,
        accessToken,
        refreshToken
      }
    }

    async generateToken(userId:number){
      const payload: AuthJwtPayload = {
        sub:userId
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, this.refreshTokenConfig)
      ])

      return {accessToken, refreshToken}
    }

    async validateJwtUser(userId:number){
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException("User not found");
      console.log("usuario autorizado")
      const currUser = { id: user.id }
      return currUser 
    }

    async validateRefreshToken(userId: number, refreshToken:string) {
      const user = await this.userService.findOne(userId);
      if (!user) throw new UnauthorizedException("User not found");

      const refreshTokenMatch = await verify(user.hashedRefreshToken, refreshToken);
      if(!refreshTokenMatch) throw new UnauthorizedException("invalid refresh token")
      const currUser = { id: user.id }
      return currUser 
    }

    async refreshToken(userId:number, username:string) {
      const {accessToken, refreshToken} = await this.generateToken(userId)
      const hashedRT = await hash(refreshToken);
      await this.userService.updateHashedRefreshToken(userId, hashedRT)
      return {
        id:userId,
        username: username,
        accessToken,
        refreshToken
      }
    }

    async signOut(userId: number) {
      console.log("signout esta rodando")
      return await this.userService.updateHashedRefreshToken(userId, null)
    }
}

