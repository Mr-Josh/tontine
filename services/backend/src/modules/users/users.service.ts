import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryFailedError, Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedResponse } from '../../common/pagination/pagination.types';
import { UsersQueryDto } from './dto/users-query.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        ...(createUserDto.phone
          ? [{ phone: createUserDto.phone }]
          : []),
      ],
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('Email already in use');
      }

      if (existingUser.phone === createUserDto.phone) {
        throw new ConflictException('Phone already in use');
      }
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 12);

    const user = this.usersRepository.create({
      email: createUserDto.email,
      passwordHash,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone ?? null,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as {
          code?: string;
          constraint?: string;
        };

        if (driverError.code === '23505') {
          if (driverError.constraint?.includes('email')) {
            throw new ConflictException('Email already in use');
          }

          if (driverError.constraint?.includes('phone')) {
            throw new ConflictException('Phone already in use');
          }

          throw new ConflictException('User already exists');
        }
      }

      throw error;
    }
  }

  async updateLastLoginAt(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      lastLoginAt: new Date(),
    });
  }

  private toResponse(user: User): UserResponseDto {
    return {
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
    };
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toResponse(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findAll(
    query: UsersQueryDto,
  ): Promise<PaginatedResponse<UserResponseDto>> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phone',
        'user.avatarUrl',
        'user.status',
        'user.emailVerifiedAt',
        'user.createdAt',
        'user.updatedAt',
      ]);

    if (query.search) {
      queryBuilder.andWhere(
        `(
        user.email ILIKE :search
        OR user.firstName ILIKE :search
        OR user.lastName ILIKE :search
      )`,
        {
          search: `%${query.search}%`,
        },
      );
    }

    if (query.status) {
      queryBuilder.andWhere('user.status = :status', {
        status: query.status,
      });
    }

    queryBuilder
      .orderBy('user.createdAt', 'DESC')
      .skip(query.skip)
      .take(query.limit);

    const [users, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / query.limit);

    return {
      data: users.map((user) => this.toResponse(user)),
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
        hasNextPage: query.page < totalPages,
        hasPreviousPage: query.page > 1,
      },
    };
  }

}