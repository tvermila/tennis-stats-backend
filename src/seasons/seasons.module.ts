import { Season } from './season.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons/seasons.service';
import { SeasonsController } from './seasons/seasons.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Season])
  ],
  providers: [SeasonsService],
  controllers: [SeasonsController]
})
export class SeasonsModule {}
