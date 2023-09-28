import { Test, TestingModule } from '@nestjs/testing';
import { SocialsService } from './socials.service';

describe('SocialsService', () => {
  let service: SocialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialsService],
    }).compile();

    service = module.get<SocialsService>(SocialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
