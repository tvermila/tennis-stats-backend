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
    await this.addPlayerResult(result);

    return await this.resultRepository.save(result);
  }

  async update(result: Result): Promise<UpdateResult> {
    return await this.resultRepository.update(result.id, result);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.resultRepository.delete(id);
  }

  private async addPlayerResult(result: Result): Promise<void> {
    const playerHome = await this.playerService.findById(result.playerHome);
    const playerAway = await this.playerService.findById(result.playerAway);
    const { pointsHome, pointsAway, tie } = result;
    if (tie || pointsHome === pointsAway) {
      playerHome.ties += 1;
      playerAway.ties += 1;
    } else if (pointsHome > pointsAway) {
      playerHome.wins += 1;
      playerAway.losses += 1;
    } else if (pointsHome < pointsAway) {
      playerHome.losses += 1;
      playerAway.wins += 1;
    } else throw new Error('Invalid result');

    playerHome.pointsWon += pointsHome
    playerHome.pointsLost += pointsAway
    
    playerAway.pointsWon += pointsAway
    playerAway.pointsLost += pointsHome

    await this.playerService.update(playerHome)
    await this.playerService.update(playerAway)
  } 


}
