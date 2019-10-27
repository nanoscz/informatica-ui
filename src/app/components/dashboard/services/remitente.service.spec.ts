import { TestBed } from '@angular/core/testing';

import { RemitenteService } from './remitente.service';

describe('RemitenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemitenteService = TestBed.get(RemitenteService);
    expect(service).toBeTruthy();
  });
});
