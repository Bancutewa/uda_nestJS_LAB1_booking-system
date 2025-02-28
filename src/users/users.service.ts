import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './users.sheme';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDTO): Promise<User> {
    const existUser = await this.UserModel.findOne({ email: userDto.email });
    if (existUser) {
      throw new BadRequestException('Email already exists');
    }

    // Nếu không có role, đặt mặc định là 'user'
    const role = userDto.role || 'user';

    const user = new this.UserModel({ ...userDto, role });
    return user.save();
  }

  async login(email: string, password: string) {
    const user = await this.UserModel.findOne({ email });
    if (!user || user.password !== password) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'tranngoctien101119',
      }),
    };
  }
  async adminLogin(email: string, password: string) {
    const user = await this.UserModel.findOne({ email, role: 'admin' });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'tranngoctien101119',
      }),
    };
  }
}
