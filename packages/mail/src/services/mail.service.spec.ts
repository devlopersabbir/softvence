import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MAIL_MODULE_OPTIONS } from '../options';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MAIL_MODULE_OPTIONS,
          useValue: {
            transport: {
                jsonTransport: true
            },
            from: 'test@example.com',
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
