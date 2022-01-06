import { TestBed } from '@angular/core/testing';

import { KanaService } from './kana.service';

describe('KanaService', () => {
  let service: KanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
