import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';

interface IUserRequest extends Request {
  user: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDTO, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signIn(loginDto.email, loginDto.password)
    res.cookie('auth_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 6 * 60 * 1000),
    }).json(result.userDetails)
  }


  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@Req() req: IUserRequest) {
    const result = await this.authService.verify(req.user)
    return result
  }
}
