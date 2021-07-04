import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AngularKlashaDirective } from './angular-klasha.directive';
import { AngularKlashaService } from './angular-klasha.service';
import { MERCHANT_KEY, BUSINESS_ID, IS_TEST_MODE } from './klasha-keys';
import { TestComponent } from './TestComponent';

describe('AngularKlashaDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let payButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularKlashaDirective, TestComponent ],
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
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    payButton = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should make payment', () => {
  //   spyOn(component, "paymentInit")
  //   expect(component).toBeTruthy();
  //   payButton.triggerEventHandler("click", {})
  //   fixture.detectChanges();

  //   expect(component.paymentInit).toHaveBeenCalled()
  // });
});
