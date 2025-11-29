import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailContext, MailModule, MailTemplateType } from '@softvence/mail';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule.forRoot({
      transport: {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
      templateRenderer: (
        type: MailTemplateType,
        context: MailContext<string>,
      ) => {
        switch (type) {
          case 'otp':
            return `
              <div style="font-family: Arial, sans-serif;">
                <h1>Your OTP Code</h1>
                <p>Your verification code is: <strong>${context.otp}</strong></p>
                <p>Expires in: ${context.expire}</p>
              </div>
            `;
          case 'welcome':
            return `
              <div style="font-family: Arial, sans-serif;">
                <h1>Welcome ${context.name}!</h1>
                <p>Thank you for joining our platform.</p>
              </div>
            `;
          case 'password-reset':
            return `
              <div style="font-family: Arial, sans-serif;">
                <h1>Password Reset Request</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${context.resetLink}">Reset Password</a>
              </div>
            `;
          default:
            throw new Error(`Unknown template type: ${type}`);
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
