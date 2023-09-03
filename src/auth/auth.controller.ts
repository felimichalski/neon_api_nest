import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

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

  @Post('/pack')
  async getPackAccessToken() {
    return this.httpService
      .post(
        'https://api.enviopack.com/auth',
        JSON.stringify({
          'api-key': process.env.ENVIOPACK_API_KEY,
          'secret-key': process.env.ENVIOPACK_SECRET_KEY,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map((res) => res.data));
  }
}
