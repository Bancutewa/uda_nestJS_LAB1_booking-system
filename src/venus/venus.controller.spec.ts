import { Test, TestingModule } from '@nestjs/testing';
import { VenusController } from './venus.controller';

describe('VenusController', () => {
  let controller: VenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenusController],
    }).compile();

    controller = module.get<VenusController>(VenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
