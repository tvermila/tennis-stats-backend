import { SeasonsService } from './../../seasons/seasons/seasons.service';
import { Result } from './../result.entity';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PlayersService } from 'src/players/players/players.service';
import CreateResultDto from './create-result.dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    private playerService: PlayersService,
    private seasonService: SeasonsService
  ) {}

  async findAll(): Promise<Result[]> {
    return await this.resultRepository.find();
  }

  async create(resultData: CreateResultDto): Promise<Result> {
    console.log('RUNNING CREATE');
    console.log(' *** RESULT DATA ***', resultData);
    if (resultData.pointsHome === 0 && resultData.pointsAway === 0) throw new BadRequestException('Both scores cannot be 0!')
    const newResult = new Result()
    newResult.playerHome = await this.playerService.findByNickname(resultData.playerHome)
    newResult.playerAway = await this.playerService.findByNickname(resultData.playerAway)
    newResult.date = resultData.date
    newResult.pointsHome = resultData.pointsHome
    newResult.pointsAway = resultData.pointsAway
    newResult.season = await this.seasonService.findBySeason(resultData.season)
    newResult.tie = resultData.tie
    newResult.tieBreak = resultData.tieBreak
    console.log('RESULT:', newResult)
    return await this.resultRepository.save(newResult);
  }

  async update(result: Result): Promise<UpdateResult> {
    return await this.resultRepository.update(result.id, result);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.resultRepository.delete(id); }

}
