import { validate } from 'class-validator';

import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

describe('Auth DTOs', () => {
  describe('RegisterDto', () => {
    it('should accept valid registration data', async () => {
      const dto = new RegisterDto();

      dto.email = 'parent@example.com';
      dto.password = 'Password123!';
      dto.firstName = 'Jean';
      dto.lastName = 'Dupont';
      dto.phone = '+237690000010';

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should reject invalid registration data', async () => {
      const dto = new RegisterDto();

      dto.email = 'not-an-email';
      dto.password = '123';
      dto.firstName = 'J';
      dto.lastName = '';
      dto.phone = '690000010';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('LoginDto', () => {
    it('should accept valid login data', async () => {
      const dto = new LoginDto();

      dto.email = 'parent@example.com';
      dto.password = 'Password123!';

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should reject invalid login data', async () => {
      const dto = new LoginDto();

      dto.email = 'not-an-email';
      dto.password = '123';

      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
