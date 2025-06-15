import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { EatingsService } from './eatings.service';
import { CreateEatingDto } from './dto/create-eating.dto';
import { UpdateEatingDto } from './dto/update-eating.dto';

@Controller('eatings')
export class EatingsController {
  constructor(private readonly eatingsService: EatingsService) {}

  @Post()
  create(@Body(ValidationPipe) createEatingDto: CreateEatingDto) {
    return this.eatingsService.create(createEatingDto);
  }

  @Get()
  findAll() {
    return this.eatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eatingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateEatingDto: UpdateEatingDto) {
    return this.eatingsService.update(id, updateEatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eatingsService.remove(+id);
  }
}
