import { PartialType } from '@nestjs/mapped-types';
import { CreateHikingDto } from './create-hiking.dto';

export class UpdateHikingDto extends PartialType(CreateHikingDto) {}
