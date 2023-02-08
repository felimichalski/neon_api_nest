import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findForAuth(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user;
      delete result.password;
      return result;
    }
    return null;
  }

  async getJwt(user: any) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
