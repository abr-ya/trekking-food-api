import { Module } from '@nestjs/common';
import { HikingsService } from './hikings.service';
import { HikingsController } from './hikings.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HikingsController],
  providers: [HikingsService],
})
export class HikingsModule {}
