import { TestBed } from '@angular/core/testing';

import { UnidadesService } from './unidades';

describe('UnidadesService', () => {
  let service: UnidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
