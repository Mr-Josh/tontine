import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
  }
}
