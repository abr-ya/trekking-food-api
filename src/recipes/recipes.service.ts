import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AddIngredientDto } from './dto/add-ingredient-dto';

const DEMO: string[] = [
  'b1e569fc-d525-4d26-b4fa-c60faf423cdc', // Каша гречневая
  '249cda10-419b-4846-a517-b55f03e6c27c', // Борщ
  '728e2fd0-f788-42c9-b8d5-6acc23245b7b', // Каша овсяная
  '87dcfe5b-11ce-4b07-867c-9249240d6cb6', // Суп харчо
];

const recipeDetailSelector = {
  name: true,
  description: true,
  ingredients: {
    select: {
      id: true,
      ingredient: {
        select: {
          id: true,
          name: true,
          kkal: true,
        },
      },
      quantity: true,
    },
  },
};

@Injectable()
export class RecipesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = await this.PrismaService.recipe.create({ data: createRecipeDto });
    return newRecipe;
  }

  async findAll() {
    return this.PrismaService.recipe.findMany();
  }

  async findOne(id: string) {
    const recipe = await this.PrismaService.recipe.findUnique({ where: { id }, select: recipeDetailSelector });
    if (!recipe) throw new NotFoundException('Recipe Not Found');

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.PrismaService.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found!`);

    return this.PrismaService.recipe.update({ where: { id }, data: updateRecipeDto });
  }

  async remove(id: string) {
    if (DEMO.includes(id)) throw new NotFoundException('This is protected recipe!');

    const recipe = await this.PrismaService.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found!`);

    return this.PrismaService.recipe.delete({ where: { id } });
  }

  // Ingredients part
  async findOneIngredients(id: string) {
    const recipe = await this.PrismaService.recipe.findUnique({ where: { id }, select: recipeDetailSelector });
    if (!recipe) throw new NotFoundException('Recipe Not Found');

    return recipe.ingredients;
  }

  async addIngredient(recipeID: string, addIngredientDto: AddIngredientDto) {
    const data = { recipeID, ...addIngredientDto };
    const newRecipe = await this.PrismaService.recipe_Ingredients.create({ data });
    return newRecipe;
  }

  async removeIngredient(id: string) {
    const recipeIngredient = await this.PrismaService.recipe_Ingredients.findUnique({ where: { id } });
    if (!recipeIngredient) throw new NotFoundException('Ingredient in Recipe Not Found');

    return this.PrismaService.recipe_Ingredients.delete({ where: { id } });
  }
}
