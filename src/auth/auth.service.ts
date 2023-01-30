import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from '../shared/security/constants';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('user', user);
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      token: this.jwtService.sign(payload, {
        privateKey: constants.JWT_SECRET,
      }),
    };
  }
}
