import { UsersRepository } from './users.repository';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

const mockUser = {
  username: 'testUser',
  password: 'testPassoword@1',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useFactory: mockUserRepository },
        JwtService,
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get(AuthService);
    userRepository = module.get(UsersRepository);
    jwtService = module.get(JwtService);
  });

  describe('getUserByUserName', () => {
    it('calls UserRepository.getUser and return the result', async () => {
      const { username } = mockUser;
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await authService.getUserByUserName(username);
      expect(result).toEqual(mockUser);
    });
  });

  describe('signin', () => {
    it('calls UserRepository.getUser to get the user and return the generated Jwt Token', async () => {
      const mockJwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockCredentialDto = {
        username: 'testUser',
        password: 'testPassoword@1',
      };

      const { password } = mockUser;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      mockUser.password = hashedPassword;

      userRepository.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockResolvedValue(mockJwtToken);
      const result = await authService.signIn(mockCredentialDto);
      expect(result).toEqual({ accessToken: mockJwtToken });
    });

    it('calls UserRepository.getUser to get the user and handles an error if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const mockCredentialDto = {
        username: 'testUser',
        password: 'testPassoword@1',
      };
      expect(authService.signIn(mockCredentialDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
