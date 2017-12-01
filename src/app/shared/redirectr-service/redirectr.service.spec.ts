import { TestBed, inject } from '@angular/core/testing';

import { RedirectrService } from './redirectr.service';

describe('RedirectrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectrService]
    });
  });

  it('should be created', inject([RedirectrService], (service: RedirectrService) => {
    expect(service).toBeTruthy();
  }));
});
