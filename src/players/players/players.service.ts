import { Player } from 'src/players/player.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findById(id): Promise<Player> {
    return await this.playerRepository.findOneOrFail(id)
  }

  async findByNickname(nickname: string): Promise<Player> {
    return await this.playerRepository.findOne({ nickName: nickname })
  }

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.save(player);
  }

  async update(player: Player): Promise<UpdateResult> {
    return await this.playerRepository.update(player.id, player);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.playerRepository.delete(id);
  }
}
