import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  categoryID: string;

  // todo: ???
  @IsNumber()
  kkal: number;
}
