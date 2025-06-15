import { PartialType } from '@nestjs/mapped-types';
import { CreateEatingDto } from './create-eating.dto';

export class UpdateEatingDto extends PartialType(CreateEatingDto) {}
