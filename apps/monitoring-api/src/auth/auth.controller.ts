import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCrdentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCrdentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCrdentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCrdentialsDto);
  }
}
