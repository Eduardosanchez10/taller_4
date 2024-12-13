import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birth: Date;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  note: string;
  @IsString()
  @IsNotEmpty()
  order: string;

}
