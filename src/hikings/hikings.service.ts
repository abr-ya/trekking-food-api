import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateHikingDto } from './dto/create-hiking.dto';
import { UpdateHikingDto } from './dto/update-hiking.dto';
import { recipeIngridientsSelector } from 'src/recipes/recipes.service';

const DEMO: string[] = [
  '69090591-dc52-4d0a-a817-bed18592d0bc', // Карелия - лыжный н/к
  'f430c801-5567-406b-9fdf-b31f7f14ba35', // Фаны 2 к.с.
];

const hikingDetailSelector = {
  id: true,
  name: true,
  daysTotal: true,
  membersTotal: true,
  eatings: {
    select: {
      id: true,
      dayNumber: true,
      eatingTimeId: true,
      eatingTime: {
        select: {
          id: true,
          name: true,
        },
      },
      recipeId: true,
      recipe: {
        select: {
          name: true,
          kkal: true,
        },
      },
    },
  },
};

const hikingDetailWithProductsSelector = {
  id: true,
  name: true,
  daysTotal: true,
  membersTotal: true,
  eatings: {
    select: {
      id: true,
      dayNumber: true,
      eatingTimeId: true,
      eatingTime: {
        select: {
          id: true,
          name: true,
        },
      },
      recipeId: true,
      recipe: {
        select: {
          name: true,
          kkal: true,
          ingredients: { select: recipeIngridientsSelector },
        },
      },
    },
  },
};

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
    const hiking = await this.PrismaService.hiking.findUnique({ where: { id }, select: hikingDetailSelector });
    if (!hiking) throw new NotFoundException(`Hiking Not Found (${id})`);

    return hiking;
  }

  async findOneWithProducts(id: string) {
    const hiking = await this.PrismaService.hiking.findUnique({
      where: { id },
      select: hikingDetailWithProductsSelector,
    });
    if (!hiking) throw new NotFoundException(`Hiking Not Found (${id})`);

    return hiking;
  }

  async findOneForShopping(id: string) {
    const hiking = await this.PrismaService.hiking.findUnique({ where: { id } });
    if (!hiking) throw new NotFoundException(`Hiking Not Found (${id})`);

    const result = await this.PrismaService.$queryRaw`select i.id, i.name, sum(ri.quantity)
      from "public"."Ingredient" i
      join "public"."Recipe_Ingredients" ri
      on ri."ingredientId" = i.id
      join "public"."Recipe" r
      on r.id  = ri."recipeID"
      join "public"."Eating" e
      on e."recipeId" = r.id
      join "public"."Hiking" h
      on h.id = e."hikingId"
      where "hikingId" = ${id}
      group by i.id`;

    return result;
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
