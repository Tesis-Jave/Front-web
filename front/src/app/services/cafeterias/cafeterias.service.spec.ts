import { TestBed } from '@angular/core/testing';

import { CafeteriasService } from './cafeterias.service';

describe('CafeteriasService', () => {
  let service: CafeteriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CafeteriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
