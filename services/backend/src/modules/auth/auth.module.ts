import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get<string>('jwt.secret');
        const expiresIn = configService.get<string>(
          'jwt.accessTokenExpiresIn',
        );
        const issuer = configService.get<string>('jwt.issuer');
        const audience = configService.get<string>('jwt.audience');

        if (!secret) {
          throw new Error('JWT_SECRET is not configured');
        }

        if (!expiresIn) {
          throw new Error('JWT_ACCESS_EXPIRES_IN is not configured');
        }

        if (!issuer) {
          throw new Error('JWT_ISSUER is not configured');
        }

        if (!audience) {
          throw new Error('JWT_AUDIENCE is not configured');
        }

        return {
          secret,
          signOptions: {
            expiresIn:
              expiresIn as NonNullable<
                JwtModuleOptions['signOptions']
              >['expiresIn'],
            issuer,
            audience,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    AuthService,
    JwtModule,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
