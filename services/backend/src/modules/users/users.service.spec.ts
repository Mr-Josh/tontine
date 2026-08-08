import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const usersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new UsersService(usersRepository as never);
  });

  describe('create', () => {
    it('should create a user with a hashed password', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const user = {
        id: 'user-id',
        email: 'parent@example.com',
        passwordHash: 'hashed-password',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      };

      usersRepository.create.mockReturnValue(user);
      usersRepository.save.mockResolvedValue(user);

      const result = await service.create({
        email: 'parent@example.com',
        password: 'Password123!',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      });

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: [
          { email: 'parent@example.com' },
          { phone: '+237690000010' },
        ],
      });

      expect(usersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'parent@example.com',
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '+237690000010',
        }),
      );

      const createCall = usersRepository.create.mock.calls[0][0];

      expect(createCall.passwordHash).not.toBe('Password123!');

      expect(
        await bcrypt.compare(
          'Password123!',
          createCall.passwordHash,
        ),
      ).toBe(true);

      expect(usersRepository.save).toHaveBeenCalledWith(user);
      expect(result).toBe(user);
    });

    it('should reject an email that already exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 'existing-user',
        email: 'parent@example.com',
      });

      await expect(
        service.create({
          email: 'parent@example.com',
          password: 'Password123!',
          firstName: 'Jean',
          lastName: 'Dupont',
        }),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(usersRepository.save).not.toHaveBeenCalled();
    });

    it('should reject a phone number that already exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 'existing-user',
        email: 'other@example.com',
        phone: '+237690000010',
      });

      await expect(
        service.create({
          email: 'parent@example.com',
          password: 'Password123!',
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '+237690000010',
        }),
      ).rejects.toThrow('Phone already in use');

      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(usersRepository.save).not.toHaveBeenCalled();
    });
    it('should convert a PostgreSQL unique violation into a conflict', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const user = {
        id: 'user-id',
        email: 'parent@example.com',
        passwordHash: 'hashed-password',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      };

      usersRepository.create.mockReturnValue(user);

      const driverError = Object.assign(new Error(), {
        code: '23505',
        constraint: 'IDX_users_email',
      });

      const postgresError = new QueryFailedError(
        'INSERT INTO users (...) VALUES (...)',
        [],
        driverError,
      );

      usersRepository.save.mockRejectedValue(postgresError);

      await expect(
        service.create({
          email: 'parent@example.com',
          password: 'Password123!',
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '+237690000010',
        }),
      ).rejects.toThrow('Email already in use');

      expect(usersRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findByEmail', () => {
    it('should return the user when found', async () => {
      const user = {
        id: 'user-id',
        email: 'parent@example.com',
      };

      usersRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('parent@example.com');

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'parent@example.com' },
      });

      expect(result).toBe(user);
    });

    it('should return null when the user does not exist', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });
});