import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HikingsService } from './hikings.service';
import { CreateHikingDto } from './dto/create-hiking.dto';
import { UpdateHikingDto } from './dto/update-hiking.dto';

@Controller('hikings')
export class HikingsController {
  constructor(private readonly hikingsService: HikingsService) {}

  @Post()
  create(@Body() createHikingDto: CreateHikingDto) {
    return this.hikingsService.create(createHikingDto);
  }

  @Get()
  findAll() {
    return this.hikingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hikingsService.findOne(id);
  }

  @Get('with-products/:id')
  findOneWithProducts(@Param('id') id: string) {
    return this.hikingsService.findOneWithProducts(id);
  }

  @Get('shopping/:id')
  findOneForShopping(@Param('id') id: string) {
    return this.hikingsService.findOneForShopping(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHikingDto: UpdateHikingDto) {
    return this.hikingsService.update(id, updateHikingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hikingsService.remove(id);
  }
}
