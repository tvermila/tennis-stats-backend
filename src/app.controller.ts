import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('LOGIN');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return 'tättärää';
  }
  
}
