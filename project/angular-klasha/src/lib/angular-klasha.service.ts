/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject } from '@angular/core';
import { MERCHANT_KEY, BUSINESS_ID, IS_TEST_MODE } from './klasha-keys';
import { KlashaOptions } from '../model/klasha-options';


interface MyWindow extends Window {
  // KlashaClient: (options: Partial<KlashaOptions>)
  KlashaClient: any;
}
declare let window: MyWindow;

@Injectable({
  providedIn: 'root',
})

export class AngularKlashaService {
  constructor(@Inject(MERCHANT_KEY) private merchantKey: string,
    @Inject(BUSINESS_ID) private businessId: string,
    @Inject(IS_TEST_MODE) private isTestMode: boolean = false) {
      console.log('here');

    const divScript = window.document.createElement('div');
    divScript.id = 'ktest';
    window.document.body.appendChild(divScript);
    const script = window.document.createElement('script');
    window.document.head.appendChild(script);
    const onLoadFunc = () => {
      script.removeEventListener('load', onLoadFunc);
      // resolve();
    };
    script.addEventListener('load', onLoadFunc);
    if (this.isTestMode) {
      script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
    } else {
      script.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
    }
    console.log('loaded');
  }


  loadScript(): Promise<void> {
    return new Promise(resolve => {
      if (window.KlashaClient && typeof window.KlashaClient.initialize === 'function') {
        resolve();
        return;
      }

      const script1 = window.document.createElement('script');
      window.document.head.appendChild(script1);
      const onLoadFunc1 = () => {
        script1.removeEventListener('load', onLoadFunc1);
        resolve();
      };
      script1.addEventListener('load', onLoadFunc1);
      if (this.isTestMode) {
        script1.setAttribute('src', 'https://klastatic.fra1.digitaloceanspaces.com/test/js/klasha-integration.js');
      } else {
        script1.setAttribute('src', 'https://klastatic.fra1.digitaloceanspaces.com/prod/js/klasha-integration.js');
      }
      console.log('loaded1');
    });
  }

  checkInput(obj: Partial<KlashaOptions>): string {
    if (!obj.merchantKey && !this.merchantKey) {
      return 'angular-klasha: Please insert a your merchantKey';
    }
    if (!obj.businessId) {
      return 'angular-klasha: Klasha businessId cannot be empty';
    }
    if (!obj.email) {
      return 'angular-klasha: Klasha email cannot be empty';
    }
    if (!obj.fullname) {
      return 'angular-klasha: Klasha name cannot be empty';
    }
    if (!obj.phone_number) {
      return 'angular-klasha: Klasha phone cannot be empty';
    }
    if (!obj.amount) {
      return 'angular-klasha: Klasha amount cannot be empty';
    }
    if (!obj.tx_ref) {
      return 'angular-klasha: Klasha tx_ref cannot be empty';
    }
    return '';
  }

  getKlashaOptions(obj: KlashaOptions): KlashaOptions {
    const klashaOptions: KlashaOptions = {
      isTestMode: obj.isTestMode || this.isTestMode,
      merchantKey: obj.merchantKey || this.merchantKey,
      businessId: obj.businessId || this.businessId,
      amount: obj.amount,
      tx_ref: obj.tx_ref,
      sourceCurrency: obj.sourceCurrency || 'NGN',
      destinationCurrency: obj.destinationCurrency || 'NGN',
      fullname: obj.fullname || '',
      email: obj.email || '',
      phone_number: obj.phone_number || '',
      paymentDescription: obj.paymentDescription || '',
      callbackUrl: obj.callbackUrl || '',
      metadata: obj.metadata || {},
      kit: {
        currency: obj.kit.currency || obj.sourceCurrency || 'NGN',
        phone_number: obj.kit.phone_number || obj.phone_number || '',
        email: obj.kit.email || obj.email || '',
        fullname: obj.kit.fullname || obj.fullname || '',
        tx_ref: obj.kit.tx_ref || obj.tx_ref || this.makeId(8),
        paymentType: obj.kit.paymentType || '',
        // callBack : obj.kit.callBack
      }
    };
    return this.clean(klashaOptions);
  }

  clean(obj: KlashaOptions) {
    // tslint:disable-next-line:prefer-const
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  makeId(length: number = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


}
