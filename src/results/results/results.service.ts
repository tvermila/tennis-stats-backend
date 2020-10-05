import { Result } from './../result.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Player } from 'src/players/player.entity';
import { PlayersService } from 'src/players/players/players.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    private playerService: PlayersService,
  ) {}

  async findAll(): Promise<Result[]> {
    return await this.resultRepository.find();
  }

  async create(result: Result): Promise<Result> {
    console.log('RUNNING CREATE');
    console.log(result);
    return await this.resultRepository.save(result);
  }

  async update(result: Result): Promise<UpdateResult> {
    return await this.resultRepository.update(result.id, result);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.resultRepository.delete(id); }

}
