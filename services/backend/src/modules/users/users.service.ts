import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryFailedError, Repository } from 'typeorm';

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

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}