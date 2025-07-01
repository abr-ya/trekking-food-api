import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AddIngredientDto } from './dto/add-ingredient-dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }

  // Ingredients
  @Get(':id/ingredients')
  findOneIngredients(@Param('id') id: string) {
    return this.recipesService.findOneIngredients(id);
  }

  @Post(':id/ingredients')
  addIngredient(@Param('id') id: string, @Body() addIngredientDto: AddIngredientDto) {
    return this.recipesService.addIngredient(id, addIngredientDto);
  }

  @Patch(':id/ingredients/:ingredientId')
  updateIngredient(@Param('ingredientId') ingredientId: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.recipesService.updateIngredient(ingredientId, updateIngredientDto);
  }

  @Delete(':id/ingredients/:ingredientId')
  removeIngredient(@Param('ingredientId') ingredientId: string) {
    return this.recipesService.removeIngredient(ingredientId);
  }
}
