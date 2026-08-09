import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const usersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    updateLastLoginAt: jest.fn(),
  };

  const jwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new AuthService(
      usersService as never,
      jwtService as never,
    );
  });

  describe('register', () => {
    it('should create a user without exposing the password hash', async () => {
      const user = {
        id: 'user-id',
        email: 'parent@example.com',
        passwordHash: '$2b$12$hashed-password',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
        status: 'ACTIVE',
        emailVerifiedAt: null,
        createdAt: new Date(),
      };

      usersService.create.mockResolvedValue(user);

      const result = await service.register({
        email: 'parent@example.com',
        password: 'Password123!',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      });

      expect(usersService.create).toHaveBeenCalledWith({
        email: 'parent@example.com',
        password: 'Password123!',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      });

      expect(result).toEqual({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        status: user.status,
        emailVerifiedAt: user.emailVerifiedAt,
        createdAt: user.createdAt,
      });

      expect(result).not.toHaveProperty('passwordHash');
    });
  });

  describe('login', () => {
    const user = {
      id: 'user-id',
      email: 'parent@example.com',
      passwordHash: '',
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '+237690000010',
      status: 'ACTIVE',
      emailVerifiedAt: null,
      createdAt: new Date(),
    };

    it('should reject an unknown email', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'unknown@example.com',
          password: 'Password123!',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(usersService.findByEmail).toHaveBeenCalledWith(
        'unknown@example.com',
      );
      expect(usersService.updateLastLoginAt).not.toHaveBeenCalled();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should reject an invalid password', async () => {
      user.passwordHash = await bcrypt.hash('CorrectPassword123!', 12);
      usersService.findByEmail.mockResolvedValue(user);

      await expect(
        service.login({
          email: 'parent@example.com',
          password: 'WrongPassword123!',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(usersService.updateLastLoginAt).not.toHaveBeenCalled();

      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should return an access token with a safe user payload', async () => {
      user.passwordHash = await bcrypt.hash('Password123!', 12);
      usersService.findByEmail.mockResolvedValue(user);
      jwtService.signAsync.mockResolvedValue('signed-access-token');

      const result = await service.login({
        email: 'parent@example.com',
        password: 'Password123!',
      });

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
      });

      expect(result).toEqual({
        accessToken: 'signed-access-token',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          status: user.status,
          emailVerifiedAt: user.emailVerifiedAt,
          createdAt: user.createdAt,
        },
      });

      expect(result.user).not.toHaveProperty('passwordHash');

      expect(usersService.updateLastLoginAt).toHaveBeenCalledWith(user.id);
    });

    it('should use the same error for unknown email and invalid password', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      let unknownEmailError: unknown;

      try {
        await service.login({
          email: 'unknown@example.com',
          password: 'Password123!',
        });
      } catch (error) {
        unknownEmailError = error;
      }

      user.passwordHash = await bcrypt.hash('CorrectPassword123!', 12);
      usersService.findByEmail.mockResolvedValue(user);

      let invalidPasswordError: unknown;

      try {
        await service.login({
          email: 'parent@example.com',
          password: 'WrongPassword123!',
        });
      } catch (error) {
        invalidPasswordError = error;
      }

      expect(unknownEmailError).toBeInstanceOf(UnauthorizedException);
      expect(invalidPasswordError).toBeInstanceOf(UnauthorizedException);

      expect(
        (unknownEmailError as UnauthorizedException).getResponse(),
      ).toEqual((invalidPasswordError as UnauthorizedException).getResponse());
    });
  });
});
