import { Module } from '@nestjs/common';
import { EatingsService } from './eatings.service';
import { EatingsController } from './eatings.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EatingsController],
  providers: [EatingsService],
})
export class EatingsModule {}
