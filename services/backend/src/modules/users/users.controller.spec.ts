import {
  NotFoundException,
} from '@nestjs/common';

import { UserStatus } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const usersService = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  const paginatedResponse = {
    data: [
      {
        id: 'user-id',
        email: 'user@example.com',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
        avatarUrl: null,
        status: UserStatus.ACTIVE,
        emailVerifiedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    meta: {
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    controller = new UsersController(
      usersService as unknown as UsersService,
    );
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      usersService.findAll.mockResolvedValue(paginatedResponse);

      const query = {
        page: 1,
        limit: 20,
      };

      const result = await controller.findAll(query as never);

      expect(usersService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedResponse);
    });

    it('should pass search and status filters to the service', async () => {
      usersService.findAll.mockResolvedValue(paginatedResponse);

      const query = {
        page: 2,
        limit: 10,
        search: 'Jean',
        status: UserStatus.ACTIVE,
      };

      const result = await controller.findAll(query as never);

      expect(usersService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedResponse);
    });
  });

  describe('findById', () => {
    it('should return the user when found', async () => {
      const user = paginatedResponse.data[0];

      usersService.findById.mockResolvedValue(user);

      const result = await controller.findById('user-id');

      expect(usersService.findById).toHaveBeenCalledWith('user-id');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when the user does not exist', async () => {
      usersService.findById.mockResolvedValue(null);

      await expect(
        controller.findById('unknown-user-id'),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(usersService.findById).toHaveBeenCalledWith(
        'unknown-user-id',
      );
    });
  });
});
