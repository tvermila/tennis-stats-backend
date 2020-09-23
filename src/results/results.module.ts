import { Result } from './result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResultsService } from './results/results.service';
import { ResultsController } from './results/results.controller';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    PlayersModule
  ],
  providers: [ResultsService],
  controllers: [ResultsController]
})
export class ResultsModule {}
