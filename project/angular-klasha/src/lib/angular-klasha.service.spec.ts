import { TestBed, inject } from '@angular/core/testing';

import { AngularKlashaService } from './angular-klasha.service';
import { MERCHANT_KEY, BUSINESS_ID, IS_TEST_MODE } from './klasha-keys';

describe('AngularKlashaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularKlashaService,
        { provide: MERCHANT_KEY, useValue: 'MERCHANT_KEY' },
        { provide: BUSINESS_ID, useValue: 'BUSINESS_ID' },
        { provide: IS_TEST_MODE, useValue: 'IS_TEST_MODE' }
      ]
    });
  });

  it('should be created', inject([AngularKlashaService], (service: AngularKlashaService) => {
    expect(service).toBeTruthy();
  }));

  it('should inject merchantKey', inject([AngularKlashaService], (service: any) => {
    expect(service.mid).toEqual('merchantKey');
  }));
});
