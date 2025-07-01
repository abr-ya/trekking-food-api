import { PartialType } from '@nestjs/mapped-types';
import { AddIngredientDto } from './add-ingredient-dto';

export class UpdateIngredientDto extends PartialType(AddIngredientDto) {}
