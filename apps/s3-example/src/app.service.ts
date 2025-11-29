import { Injectable } from '@nestjs/common';
import { S3Service } from '@softvence/s3';

@Injectable()
export class AppService {
  constructor(private readonly s3Service: S3Service) {}
  getHello(): string {
    return 'Hello World!';
  }
}
