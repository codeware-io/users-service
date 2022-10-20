import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlpha()
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsAlpha()
  @IsString()
  @IsOptional()
  lastName?: string;

  @MinLength(8)
  @MaxLength(16)
  @IsString()
  @IsNotEmpty()
  password: string;
}
