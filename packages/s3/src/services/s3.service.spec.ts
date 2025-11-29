import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { S3_MODULE_OPTIONS } from '../constants/s3.options';
import {describe, beforeEach, it, expect} from 'vitest'

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: S3_MODULE_OPTIONS,
          useValue: {
            region: 'us-east-1',
            accessKeyId: 'test',
            secretAccessKey: 'test',
            bucket: 'test-bucket',
          },
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
