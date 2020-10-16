import { UsersService } from './../users/users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(userName);
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('*** LOGGING IN ***')
    console.log('USER:', user)
    const payload = { username: user.userName };
    console.log('TOKEN PAYLOAD', payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
