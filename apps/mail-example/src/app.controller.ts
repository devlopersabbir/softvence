import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-welcome-email')
  async sendWelcomeEmail(@Body() body: { email: string }) {
    await this.appService.sendWelcomeEmail(body.email);
    return { message: 'Welcome email sent successfully' };
  }

  @Post('send-otp')
  async sendOTP(@Body() body: { email: string; otp: string }) {
    await this.appService.sendOTP(body.email, body.otp);
    return { message: 'OTP sent successfully' };
  }

  @Post('send-password-reset-link')
  async sendPasswordResetLink(
    @Body() body: { email: string; resetLink: string },
  ) {
    await this.appService.sendPasswordResetLink(body.email, body.resetLink);
    return { message: 'Password reset link sent successfully' };
  }
}
