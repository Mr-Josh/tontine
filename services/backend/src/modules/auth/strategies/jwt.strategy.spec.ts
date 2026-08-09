import { UnauthorizedException } from '@nestjs/common';

import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  const configService = {
    get: jest.fn((key: string) => {
      const config: Record<string, string> = {
        'jwt.secret': 'test-secret',
        'jwt.issuer': 'tontine-api',
        'jwt.audience': 'tontine-client',
      };

      return config[key];
    }),
  };

  let strategy: JwtStrategy;

  beforeEach(() => {
    jest.clearAllMocks();
    strategy = new JwtStrategy(configService as never);
  });

  it('should validate a valid payload', () => {
    const result = strategy.validate({
      sub: 'user-id',
      email: 'parent@example.com',
    });

    expect(result).toEqual({
      userId: 'user-id',
      email: 'parent@example.com',
    });
  });

  it('should reject a payload without sub', () => {
    expect(() =>
      strategy.validate({
        sub: '',
        email: 'parent@example.com',
      }),
    ).toThrow(UnauthorizedException);
  });

  it('should reject a payload without email', () => {
    expect(() =>
      strategy.validate({
        sub: 'user-id',
        email: '',
      }),
    ).toThrow(UnauthorizedException);
  });
});
