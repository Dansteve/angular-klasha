/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { KlashaOptions, PrivateKlashaOptions } from '../model/klasha-options';
import { AngularKlashaService } from './angular-klasha.service';

interface MyWindow extends Window {
  KlashaClient: any;
}
declare let window: MyWindow;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[angular-klasha]',
})
export class AngularKlashaDirective {
  @Input() merchantKey: string;
  @Input() isTestMode: boolean;
  @Input() businessId: string;
  @Input() amount: number;
  @Input() metadata: any;
  @Input() tx_ref: string;
  @Input() currency: string;
  @Input() fullname: string;
  @Input() email: string;
  @Input() phone_number: string;
  @Input() paymentDescription: string;
  @Input() redirectUrl: string;
  @Input() klashaOptions: KlashaOptions;
  @Input() class: string;
  @Input() style: any;
  @Output() paymentInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() callBack: EventEmitter<any> = new EventEmitter<any>(); // tslint:disable-line
  private _KlashaOptions: Partial<PrivateKlashaOptions>; // tslint:disable-line
  private isPaying = false;

  constructor(private KlashaService: AngularKlashaService) { }

  async pay() {
    let errorText = '';
    if (this.klashaOptions && Object.keys(this.klashaOptions).length >= 2) {
      errorText = this.validateInput(this.klashaOptions);
      this.generateOptions(this.klashaOptions);
    } else {
      errorText = this.validateInput(this);
      this.generateOptions(this);
    }
    if (errorText) {
      console.error(errorText);
      return errorText;
    }
    await this.KlashaService.loadScript();
    // if (this.isPaying) { return; }
    if (this.paymentInit.observers.length) {
      this.paymentInit.emit();
    }

    const payment = new window.KlashaClient(
      this._KlashaOptions.merchantKey,
      this._KlashaOptions.businessId || 1,
      this._KlashaOptions.amount,
      'ktest',
      this._KlashaOptions.callbackUrl,
      this._KlashaOptions.destinationCurrency,
      this._KlashaOptions.sourceCurrency,
      this._KlashaOptions.kit);
    payment.init();
    // this.isPaying = false;
  }

  validateInput(obj: any) {
    if (!this.callBack.observers.length) {
      return 'angular-klasha: Insert a callBack output like so (callBack)=\'PaymentComplete($event)\' to check payment status';
    }
    return this.KlashaService.checkInput(obj);
  }

  generateOptions(obj: any) {
    this._KlashaOptions = this.KlashaService.getKlashaOptions(obj);
    this._KlashaOptions.kit.callBack = (...response) => {
      this.callBack.emit(...response);
    };
    this._KlashaOptions.callBack = (...response) => {
      this.callBack.emit(...response);
    };
  }

  @HostListener('click')
  async buttonClick() {
    this.pay();
  }
}
