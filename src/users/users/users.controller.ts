import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async players(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async playerById(@Param('id') id): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  async create(@Body() userData: User): Promise<any> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('UPDATE #', userData.id);
    return this.userService.update(userData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.userService.delete(id);
  }
}
