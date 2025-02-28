import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    return this.usersService.adminLogin(body.email, body.password);
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userDto: UserDTO) {
    return this.usersService.register(userDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }
}
