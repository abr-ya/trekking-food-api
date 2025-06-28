import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateHikingDto } from './dto/create-hiking.dto';
import { UpdateHikingDto } from './dto/update-hiking.dto';

const DEMO: string[] = [
  '69090591-dc52-4d0a-a817-bed18592d0bc', // Карелия - лыжный н/к
  'f430c801-5567-406b-9fdf-b31f7f14ba35', // Фаны 2 к.с.
];

@Injectable()
export class HikingsService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createHikingDto: CreateHikingDto) {
    const newItem = await this.PrismaService.hiking.create({ data: createHikingDto });

    return newItem;
  }

  async findAll() {
    return this.PrismaService.hiking.findMany();
  }

  async findOne(id: string) {
    const hiking = await this.PrismaService.hiking.findUnique({ where: { id } });
    if (!hiking) throw new NotFoundException(`Hiking Not Found (${id})`);

    return hiking;
  }

  async update(id: string, updateHikingDto: UpdateHikingDto) {
    const hiking = await this.PrismaService.hiking.findUnique({ where: { id } });
    if (!hiking) throw new NotFoundException(`Hiking ${id} not found!`);

    return this.PrismaService.hiking.update({ where: { id }, data: updateHikingDto });
  }

  async remove(id: string) {
    if (DEMO.includes(id)) throw new NotFoundException('This is protected hiking!');

    const hiking = await this.PrismaService.hiking.findUnique({ where: { id } });
    if (!hiking) throw new NotFoundException(`Recipe ${id} not found!`);

    return this.PrismaService.hiking.delete({ where: { id } });
  }
}
