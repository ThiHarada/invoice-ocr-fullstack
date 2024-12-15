import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

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
}
