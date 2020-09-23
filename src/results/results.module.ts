import { Result } from './result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResultsService } from './results/results.service';
import { ResultsController } from './results/results.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result])
  ],
  providers: [ResultsService],
  controllers: [ResultsController]
})
export class ResultsModule {}
