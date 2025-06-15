import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateEatingDto } from './dto/create-eating.dto';
import { UpdateEatingDto } from './dto/update-eating.dto';

@Injectable()
export class EatingsService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createEatingDto: CreateEatingDto) {
    const newItem = await this.PrismaService.eating.create({ data: createEatingDto });
    return newItem;
  }

  findAll() {
    return this.PrismaService.eating.findMany();
  }

  async findOne(id: string) {
    const eating = await this.PrismaService.eating.findUnique({ where: { id } });
    if (!eating) throw new NotFoundException(`Eating Not Found (${id})`);

    return eating;
  }

  async update(id: string, updateEatingDto: UpdateEatingDto) {
    const ingredient = await this.PrismaService.eating.findUnique({ where: { id } });
    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found!`);

    return this.PrismaService.eating.update({ where: { id }, data: updateEatingDto });
  }

  // todo: create it!
  remove(id: number) {
    return `This action removes a #${id} eating`;
  }
}
