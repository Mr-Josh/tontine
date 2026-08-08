import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;

  const usersService = {
    create: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(usersService as never);
  });

  describe('register', () => {
    it('should create a user through UsersService', async () => {
      const registerDto: RegisterDto = {
        email: 'parent@example.com',
        password: 'Password123!',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      };

      const user = {
        id: 'user-id',
        email: registerDto.email,
        passwordHash: 'hashed-password',
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
        status: 'ACTIVE',
      };

      usersService.create.mockResolvedValue(user);

      const result = await service.register(registerDto);

      expect(usersService.create).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual({
        id: 'user-id',
        email: 'parent@example.com',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
        status: 'ACTIVE',
      });
    });

    it('should never expose the password hash', async () => {
      const registerDto: RegisterDto = {
        email: 'parent@example.com',
        password: 'Password123!',
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+237690000010',
      };

      usersService.create.mockResolvedValue({
        id: 'user-id',
        email: registerDto.email,
        passwordHash: '$2b$12$hashed-password',
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
        status: 'ACTIVE',
      });

      const result = await service.register(registerDto);

      expect(result).not.toHaveProperty('passwordHash');
    });
  });
});
