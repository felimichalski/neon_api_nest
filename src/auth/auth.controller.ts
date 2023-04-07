import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res) {
    const userToken = await this.authService.getJwt(req.user);
    req.user.userToken = userToken;
    res.send(req.user);
  }

  @Post('/signup')
  async signup(@Req() req, @Res() res) {
    const userToken = await this.authService.getJwt(req.user);
    req.user.userToken = userToken;
    res.send(req.user);
  }
}
