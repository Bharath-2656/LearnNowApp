import { TestBed } from '@angular/core/testing';

import { AreaofinterestService } from './areaofinterest.service';

describe('AreaofinterestService', () => {
  let service: AreaofinterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaofinterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
