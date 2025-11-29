import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Module } from '@softvence/s3';

@Module({
  imports: [
    S3Module.forRoot({
      region: 'region',
      bucket: 'bucket',
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      cache: {
        isCache: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
