import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { genSalt, hash, compare, compareSync } from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  createUser: jest.fn(),
});

const credentialDto = {
  username: 'testUser',
  password: 'testPassoword@1',
};

const mockUser = {
  _id: 'testId',
  id: 'testId',
  ...credentialDto,
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UsersRepository;
  let jwtService: JwtService;
  const token = 'jwtToken';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UsersRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getUserByUserName', () => {
    it('calls UserRepository.getUser and return the result', async () => {
      const { username } = mockUser;
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
      const result = await authService.getUserByUserName(username);
      expect(result).toEqual(mockUser);
    });
  });

  describe('signup', () => {
    it('should register the new user', async () => {
      const bcrypt = { genSalt, hash, compare, compareSync };
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest
        .spyOn(userRepository, 'create')
        .mockImplementationOnce(() => mockUser);
      jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      const result = await authService.signUp(credentialDto);

      expect(userRepository.createUser).toHaveBeenCalled();

      expect(result).toBe(void 0);
    });

    it('should throw duplicate username entered', async () => {
      jest.spyOn(userRepository, 'createUser').mockImplementationOnce(() => {
        throw new ConflictException();
      });

      await expect(authService.signUp(credentialDto)).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe('signin', () => {
    it('should login user and return the token', async () => {
      const bcrypt = { genSalt, hash, compare, compareSync };
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(mockUser.password, salt);
      mockUser.password = hashedPassword;
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
      const result = await authService.signIn(credentialDto);

      expect(result).toEqual({ accessToken: token });
    });

    it('should throw error for invalid username', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);
      expect(authService.signIn(credentialDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
