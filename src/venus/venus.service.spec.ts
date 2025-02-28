import { Test, TestingModule } from '@nestjs/testing';
import { VenusService } from './venus.service';

describe('VenusService', () => {
  let service: VenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenusService],
    }).compile();

    service = module.get<VenusService>(VenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
