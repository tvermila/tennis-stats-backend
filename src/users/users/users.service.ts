import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';
import UpdatePasswordDto from './update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async findByUsername(userName: string): Promise<User> {
    console.log('FIND BY USERNAME IN USER SERVICE');
    return await this.userRepository.findOne({ userName });
  }

  async create(user: User): Promise<User> {
    if(await this.findByUsername(user.userName)) throw new ConflictException('User already exists!')
    user.password = await this.hashPassword(user.password);
    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
  }

  async updatePassword(userData: UpdatePasswordDto): Promise<UpdateResult> {
    console.log('*** UPDATING USER PASSWORD ***')
    const user = await this.findById(userData.id);
    console.log('USER FROM DB:', user);

    if (!user) throw new NotFoundException();
    if (!await bcrypt.compare(userData.oldPass, user.password))
      throw new BadRequestException('Invalid old password');

    user.password = await this.hashPassword(userData.newPass);

    return await this.update(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
