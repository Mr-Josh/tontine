import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

import { UsersQueryDto } from './dto/users-query.dto';
import { UserStatus } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const usersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const createUsersQuery = (
    overrides: Partial<UsersQueryDto> = {},
  ): UsersQueryDto => {
    return Object.assign(new UsersQueryDto(), {
      page: 1,
      limit: 20,
      ...overrides,
    });
  };

  const createUser = (overrides = {}) => ({
    id: 'user-id',
    email: 'parent@example.com',
    passwordHash: 'hashed-password',
    firstName: 'Jean',
    lastName: 'Dupont',
    phone: '+237690000010',
    avatarUrl: null,
    status: UserStatus.ACTIVE,
    emailVerifiedAt: null,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    service = new UsersService(usersRepository as never);
  });

  describe('create', () => {
    it('should create a user with a hashed password', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const user = createUser();

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

      await expect(
        bcrypt.compare(
          'Password123!',
          createCall.passwordHash,
        ),
      ).resolves.toBe(true);

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

      const user = createUser();

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

  describe('findById', () => {
    it('should return a safe user without the password hash', async () => {
      const user = createUser();

      usersRepository.findOne.mockResolvedValue(user);

      const result = await service.findById('user-id');

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'user-id' },
      });

      expect(result).toEqual({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        status: user.status,
        emailVerifiedAt: user.emailVerifiedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      expect(result).not.toHaveProperty('passwordHash');
    });

    it('should return null when the user does not exist', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      const result = await service.findById('unknown-user-id');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    const queryBuilder = {
      select: jest.fn(),
      andWhere: jest.fn(),
      orderBy: jest.fn(),
      skip: jest.fn(),
      take: jest.fn(),
      getManyAndCount: jest.fn(),
    };

    beforeEach(() => {
      usersRepository.createQueryBuilder.mockReturnValue(queryBuilder);

      queryBuilder.select.mockReturnThis();
      queryBuilder.andWhere.mockReturnThis();
      queryBuilder.orderBy.mockReturnThis();
      queryBuilder.skip.mockReturnThis();
      queryBuilder.take.mockReturnThis();

      queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);
    });

    it('should return paginated users without password hashes', async () => {
      const users = [
        createUser(),
      ];

      queryBuilder.getManyAndCount.mockResolvedValue([users, 25]);

      const result = await service.findAll(
        createUsersQuery({
          page: 2,
          limit: 10,
        }),
      );

      expect(usersRepository.createQueryBuilder).toHaveBeenCalledWith('user');

      expect(queryBuilder.skip).toHaveBeenCalledWith(10);
      expect(queryBuilder.take).toHaveBeenCalledWith(10);

      expect(result).toEqual({
        data: [
          {
            id: users[0].id,
            email: users[0].email,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            phone: users[0].phone,
            avatarUrl: users[0].avatarUrl,
            status: users[0].status,
            emailVerifiedAt: users[0].emailVerifiedAt,
            createdAt: users[0].createdAt,
            updatedAt: users[0].updatedAt,
          },
        ],
        meta: {
          page: 2,
          limit: 10,
          total: 25,
          totalPages: 3,
          hasNextPage: true,
          hasPreviousPage: true,
        },
      });

      expect(result.data[0]).not.toHaveProperty('passwordHash');
    });

    it('should filter users by search', async () => {
      await service.findAll(
        createUsersQuery({
          search: 'Jean',
        }),
      );

      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        expect.stringContaining('ILIKE'),
        {
          search: '%Jean%',
        },
      );
    });

    it('should filter users by status', async () => {
      await service.findAll(
        createUsersQuery({
          status: UserStatus.ACTIVE,
        }),
      );

      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'user.status = :status',
        {
          status: UserStatus.ACTIVE,
        },
      );
    });

    it('should apply search and status filters together', async () => {
      await service.findAll(
        createUsersQuery({
          search: 'Jean',
          status: UserStatus.ACTIVE,
        }),
      );

      expect(queryBuilder.andWhere).toHaveBeenCalledTimes(2);

      expect(queryBuilder.andWhere).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('ILIKE'),
        {
          search: '%Jean%',
        },
      );

      expect(queryBuilder.andWhere).toHaveBeenNthCalledWith(
        2,
        'user.status = :status',
        {
          status: UserStatus.ACTIVE,
        },
      );
    });

    it('should return correct pagination metadata for an empty result', async () => {
      const result = await service.findAll(
        createUsersQuery(),
      );

      expect(result).toEqual({
        data: [],
        meta: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    });
  });

  describe('updateLastLoginAt', () => {
    it('should update the last login timestamp', async () => {
      usersRepository.update.mockResolvedValue({
        affected: 1,
      });

      await service.updateLastLoginAt('user-id');

      expect(usersRepository.update).toHaveBeenCalledWith(
        'user-id',
        expect.objectContaining({
          lastLoginAt: expect.any(Date),
        }),
      );
    });
  });
});
