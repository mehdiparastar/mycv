import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Test } from '@nestjs/testing/test';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('Auth service', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the auth service

    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, storedHash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(storedHash).toBeDefined();
  });

  it('throwing an error on dupliucate email in signing up', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@test.com', password: 'test' } as User,
      ]);
    await expect(service.signup('test@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throwing an error on signing in with unused email', async () => {
    await expect(service.signin('test@test.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'test@test.com',
          password:
            '28157b84cc332eb6.da24bce28331d46f63518f8096adad0ccc22ab8aa49d22b3d333ece5835c283b',
        } as User,
      ]);
    await expect(service.signin('test@test.com', 'test_')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if correct password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'test@test.com',
          password:
            '28157b84cc332eb6.da24bce28331d46f63518f8096adad0ccc22ab8aa49d22b3d333ece5835c283b',
        } as User,
      ]);
    const user = await service.signin('test@test.com', 'test');
    expect(user).toBeDefined();
  });
});
