import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string, who:string): Promise<any> {
    
    let user = false
    switch(who) {
      case "doctor":
        user = await this.authService.validateDoctor(email, password);
        break;

      case "patient":
         user = await this.authService.validatePatient(email, password);
        break;
      
    }
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
