import { TestBed } from '@angular/core/testing';

import { CatergoriaServiceService } from './catergoria-service.service';

describe('CatergoriaServiceService', () => {
  let service: CatergoriaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatergoriaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
