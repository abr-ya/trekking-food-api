import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHikingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  membersTotal: number;

  @IsNotEmpty()
  @IsNumber()
  daysTotal: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
