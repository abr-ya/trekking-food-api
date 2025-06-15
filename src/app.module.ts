import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { EatingsModule } from './eatings/eatings.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule, IngredientsModule, AuthModule, EatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
