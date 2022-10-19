import { TestBed } from '@angular/core/testing';

import { LeadguardGuard } from './leadguard.guard';

describe('LeadguardGuard', () => {
  let guard: LeadguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeadguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
