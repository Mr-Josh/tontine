import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('jwt.secret');
    const issuer = configService.get<string>('jwt.issuer');
    const audience = configService.get<string>('jwt.audience');

    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    if (!issuer) {
      throw new Error('JWT_ISSUER is not configured');
    }

    if (!audience) {
      throw new Error('JWT_AUDIENCE is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      issuer,
      audience,
    });
  }

  validate(payload: JwtPayload) {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
