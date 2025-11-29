import { Injectable } from '@nestjs/common';
import { MailService } from '@softvence/mail';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailService) {}
  getHello(): string {
    // const res = this.service.uploadFiles();
    return 'Hello World!';
  }

  // Send welcome email
  async sendWelcomeEmail(email: string) {
    await this.mailService.send({
      to: email,
      subject: 'Welcome!',
      template: 'welcome',
      context: { name: 'John Doe' },
    });
  }

  // send otp
  async sendOTP(email: string, otp: string) {
    await this.mailService.send({
      to: email,
      subject: 'Your OTP Code',
      template: 'otp',
      context: {
        otp,
        expire: '5m',
      },
    });
  }

  // Sed Password Reset Link
  async sendPasswordResetLink(email: string, resetLink: string) {
    await this.mailService.send({
      to: email,
      subject: 'Reset Your Password',
      template: 'password-reset',
      context: { resetLink },
    });
  }
}
