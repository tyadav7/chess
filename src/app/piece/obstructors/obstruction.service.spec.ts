import { TestBed } from '@angular/core/testing';

import { ObstructionValidatorService } from './obstruction.service';

describe('ObstructionValidatorService', () => {
  let service: ObstructionValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstructionValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
