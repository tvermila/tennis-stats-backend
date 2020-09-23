import { Season } from './../season.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class SeasonsService {
  constructor(@InjectRepository(Season)
  private seasonRepository: Repository<Season>) {}

  async findAll(): Promise<Season[]> {
    return await this.seasonRepository.find();
  }

  async create(season: Season): Promise<Season> {
    return await this.seasonRepository.save(season);
  }

  async update(season: Season): Promise<UpdateResult> {
    return await this.seasonRepository.update(season.id, season);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.seasonRepository.delete(id);
  }

}
