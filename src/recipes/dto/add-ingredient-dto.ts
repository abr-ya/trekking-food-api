import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddIngredientDto {
  @IsString()
  @IsNotEmpty()
  ingredientId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
