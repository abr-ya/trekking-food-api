import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient-dto';

const DEMO = [
  'dab76216-d422-4688-9abc-e76b7145cb4f',
  'a2101f72-40eb-4ef5-bcff-4bb64ba309db',
  'f863dbd1-0a14-4a2c-b0d3-3bda2643dab7',
  '842ba14b-7d2d-4cd7-a620-2744053e1673',
  '026e9e82-847d-4c35-8b7a-981d6cf82aa9',
];

@Injectable()
export class IngredientsService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const newInredient = await this.PrismaService.ingredient.create({ data: createIngredientDto });
    return newInredient;
  }

  async findAll() {
    return this.PrismaService.ingredient.findMany();
  }

  async findOne(id: string) {
    const ingredient = await this.PrismaService.ingredient.findUnique({ where: { id } });
    if (!ingredient) throw new NotFoundException('Ingredient Not Found');

    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.PrismaService.ingredient.findUnique({ where: { id } });
    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found!`);

    return this.PrismaService.ingredient.update({ where: { id }, data: updateIngredientDto });
  }

  async remove(id: string) {
    if (DEMO.includes(id)) throw new NotFoundException('This is protected ingredient!');

    const ingredient = await this.PrismaService.ingredient.findUnique({ where: { id } });
    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found!`);

    return this.PrismaService.ingredient.delete({ where: { id } });
  }
}
