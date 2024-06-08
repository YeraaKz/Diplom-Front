import { TestBed } from '@angular/core/testing';

import { QrcodeserviceService } from './qrcodeservice.service';

describe('QrcodeserviceService', () => {
  let service: QrcodeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcodeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
