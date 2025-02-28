import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
  Length,
  IsIn,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 100)
  address: string;

  age: String;

  @IsBoolean()
  status: boolean = false;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsIn(['user', 'admin'])
  role: string;
}
