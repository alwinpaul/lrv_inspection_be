import { Test, TestingModule } from '@nestjs/testing';
import { DmiService } from './dmi.service';

describe('DmiService', () => {
  let service: DmiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmiService],
    }).compile();

    service = module.get<DmiService>(DmiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
