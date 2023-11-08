import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const result = await this.userService.login(username, password);
    console.log('--->>>result: ', result);
    if (!result) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return result;
  }


  @UseGuards(AuthGuard('jwt'))

  @Get('users')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUsers(@Request() req) {
    console.log('--->>>here 2');
    return this.userService.findAll();
  }
}
