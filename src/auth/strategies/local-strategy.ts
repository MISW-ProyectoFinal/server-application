import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const who = req.body['who'];
    let user = false;
    switch (who) {
      case 'doctor':
        user = await this.authService.validateDoctor(username, password);
        break;

      case 'patient':
        user = await this.authService.validatePatient(username, password);
        break;
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
