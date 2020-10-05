import { UsersService } from './../users/users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    console.log('*** VALIDATING USER ***');
    const user = await this.userService.findByUsername(userName);
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('*** LOGGING IN ***')
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
