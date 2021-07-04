/* eslint-disable @typescript-eslint/naming-convention */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularKlashaComponent } from './angular-klasha.component';
import { AngularKlashaService } from './angular-klasha.service';
import { MERCHANT_KEY, BUSINESS_ID, IS_TEST_MODE } from './klasha-keys';

describe('AngularKlashaComponent', () => {
  let component: AngularKlashaComponent;
  let fixture: ComponentFixture<AngularKlashaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularKlashaComponent],
      providers: [
        AngularKlashaService,
        { provide: MERCHANT_KEY, useValue: 'MERCHANT_KEY' },
        { provide: BUSINESS_ID, useValue: 'BUSINESS_ID' },
        { provide: IS_TEST_MODE, useValue: 'IS_TEST_MODE' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularKlashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load the modal when the amount is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.merchantKey = 'merchantKey';
    component.businessId = 'businessId';
    component.callBack.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('angular-klasha: Klasha amount cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should not load the modal when the email is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.merchantKey = 'merchantKey';
    component.businessId = 'businessId';
    component.amount = 10000;
    component.callBack.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('angular-klasha: Klasha email cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should not load the modal when merchantKey is not provided', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.businessId = 'businessId';
    component.amount = 10000;
    component.callBack.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('angular-klasha: Klasha merchantKey cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should prefer merchantKey used by component', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.amount = 10000;
    component.merchantKey = 'merchantKey';
    component.businessId = 'businessId';
    component.callBack.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('angular-klasha: Klasha ref cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
    // eslint-disable-next-line no-underscore-dangle
    expect(component._KlashaOptions.merchantKey).toEqual(component.merchantKey);
  });

  it('should not load with incomplete KlashaOptions object', async () => {
    spyOn(component.paymentInit, 'emit');
    component.klashaOptions = {
      email: 'someuser@email.com',
      phone_number: '',
      merchantKey: 'merchantKey',
      amount: 10000,
      sourceCurrency: '',
      destinationCurrency: '',
      tx_ref: '',
      businessId: 'businessId',
      fullname: '',
      paymentDescription: '',
      kit: {
        currency: '',
        phone_number: '',
        email: 'someuser@email.com',
        fullname: '',
        tx_ref: '',
        paymentType: '',
      }
    };
    component.callBack.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toEqual('angular-klasha: Klasha ref cannot be empty');
    expect(component.paymentInit.emit).not.toHaveBeenCalled();
  });

  it('should accept the KlashaOptions object', async () => {
    spyOn(component.paymentInit, 'emit');
    component.klashaOptions = {
      email: 'someuser@email.com',
      phone_number: '',
      merchantKey: 'merchantKey',
      amount: 10000,
      sourceCurrency: '',
      destinationCurrency: '',
      tx_ref: '',
      businessId: 'businessId',
      fullname: '',
      paymentDescription: '',
      kit: {
        currency: '',
        phone_number: '',
        email: 'someuser@email.com',
        fullname: '',
        tx_ref: '',
        paymentType: '',
      }
    };
    component.callBack.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toBeUndefined();
    expect(component.paymentInit.emit).toHaveBeenCalled();
  });

  it('should load the modal when parameters are passed', async () => {
    spyOn(component.paymentInit, 'emit');
    component.email = 'someuser@email.com';
    component.merchantKey = 'merchantKey';
    component.amount = 10000;
    component.callBack.subscribe(() => { });
    component.paymentInit.subscribe(() => { });
    const error = await component.pay();

    fixture.detectChanges();
    expect(error).toBeUndefined();
    expect(component.paymentInit.emit).toHaveBeenCalled();
  });
});
