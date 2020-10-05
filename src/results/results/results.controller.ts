import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { ResultsService } from './results.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Result } from '../result.entity';

@UseGuards(JwtAuthGuard)
@Controller('results')
export class ResultsController {
  constructor(private resultService: ResultsService) {}

  @Get()
  async results(): Promise<Result[]> {
    console.log('ALL RESULTS CONTROLLER')
    return this.resultService.findAll();
  }

  @Post()
  async create(@Body() resultData: Result): Promise<any> {
    return this.resultService.create(resultData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() resultData: Result): Promise<any> {
    resultData.id = Number(id);
    console.log('UPDATE #', resultData.id);
    return this.resultService.update(resultData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.resultService.delete(id);
  }
}
