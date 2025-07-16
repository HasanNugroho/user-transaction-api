import {
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE, USER_SERVICE } from 'src/common/constant';
import { UserModel } from 'src/domains/model/user';
import { IAuthService } from 'src/domains/service/auth.service.interface';
import { Credential } from './dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserService } from 'src/domains/service/user.service.interface';
import { HttpResponse } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
@Public()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const created = await this.userService.create(body);
    return new HttpResponse(true, 'Registration successful', created);
  }

  @Post('/login')
  async login(@Body() body: Credential) {
    const token = await this.authService.login(body);
    return new HttpResponse(true, 'Login successful', { token });
  }
}
