import { TestBed } from '@angular/core/testing';

import { InstructorgaurdGuard } from './instructorgaurd.guard';

describe('InstructorgaurdGuard', () => {
  let guard: InstructorgaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstructorgaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
