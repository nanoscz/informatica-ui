import { TestBed } from '@angular/core/testing';

import { AsignarService } from './asignar.service';

describe('AsignarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignarService = TestBed.get(AsignarService);
    expect(service).toBeTruthy();
  });
});
