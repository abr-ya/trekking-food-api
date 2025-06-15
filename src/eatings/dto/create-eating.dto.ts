import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEatingDto {
  @IsString()
  @IsNotEmpty()
  hikingId: string;

  @IsNumber()
  @IsNotEmpty()
  dayNumber: number;

  @IsString()
  @IsNotEmpty()
  eatingTimeId: string;

  @IsString()
  @IsNotEmpty()
  recipeId: string;
}
