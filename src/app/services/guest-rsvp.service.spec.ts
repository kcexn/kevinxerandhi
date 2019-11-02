import { TestBed } from '@angular/core/testing';

import { GuestRsvpService } from './guest-rsvp.service';

describe('GuestRsvpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestRsvpService = TestBed.get(GuestRsvpService);
    expect(service).toBeTruthy();
  });
});
