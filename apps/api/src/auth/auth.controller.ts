import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  registerUser(@Body() createUserDto : CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("signin")
  login(@Request() req){
    return this.authService.login(req.user.id, req.user.username)
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protectedMethod(@Request() req){
    return {message: `Protected methods are available, this is your UID: ${req.user.id}`}
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  signout(@Request() req) {
    return this.authService.signOut(req.user.id);
  }
}
