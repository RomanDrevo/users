import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-256-bit-secret',
    });
  }

  async validate(payload: any) {
    console.log('--->>>payload: ', payload);
    const user = await this.userService.findOne(payload.username);
    console.log('--->>>user: ', user);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
