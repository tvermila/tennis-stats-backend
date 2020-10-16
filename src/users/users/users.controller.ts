import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from '../user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { identity } from 'rxjs';
import UpdatePasswordDto from './update-password.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async players(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async playerById(@Param('id') id): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() userData: User): Promise<any> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async updatePassword(@Param('id') id, @Body() userData: UpdatePasswordDto): Promise<any> {
    userData.id = Number(id);
    console.log('UPDATE PASSWORD FOR USER ID #', userData.id);
    return this.userService.updatePassword(userData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.userService.delete(id);
  }
}
