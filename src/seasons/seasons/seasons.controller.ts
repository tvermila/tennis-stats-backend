import { SeasonsService } from './seasons.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Season } from '../season.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/seasons')
export class SeasonsController {
  constructor(private seasonService: SeasonsService) {}

  @Get()
  async seasons(): Promise<Season[]> {
    return this.seasonService.findAll();
  }

  @Post()
  async create(@Body() seasonData: Season): Promise<any> {
    return this.seasonService.create(seasonData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() seasonData: Season): Promise<any> {
    seasonData.id = Number(id);
    console.log('UPDATE #', seasonData.id);
    return this.seasonService.update(seasonData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.seasonService.delete(id);
  }
}
