import { Test, TestingModule } from '@nestjs/testing';
import { DmiController } from './dmi.controller';
import { DmiService } from './dmi.service';

describe('DmiController', () => {
  let controller: DmiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmiController],
      providers: [DmiService],
    }).compile();

    controller = module.get<DmiController>(DmiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
