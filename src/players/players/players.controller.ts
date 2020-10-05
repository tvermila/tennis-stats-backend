import { PlayersService } from './players.service';
import { Player } from 'src/players/player.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}

  @Get()
  async players(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  async playerById(@Param('id') id): Promise<Player> {
    return this.playerService.findById(id)
  }

  @Post()
  async create(@Body() playerData: Player): Promise<any> {
    return this.playerService.create(playerData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() playerData: Player): Promise<any> {
    playerData.id = Number(id);
    console.log('UPDATE #', playerData.id);
    return this.playerService.update(playerData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.playerService.delete(id);
  }
}
