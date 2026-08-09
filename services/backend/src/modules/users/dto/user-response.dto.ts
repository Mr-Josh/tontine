import { UserStatus } from '../entities/user.entity';

export class UserResponseDto {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  phone!: string | null;
  avatarUrl!: string | null;
  status!: UserStatus;
  emailVerifiedAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
