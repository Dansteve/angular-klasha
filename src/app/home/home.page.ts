/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { KlashaOptions } from 'angular-klasha';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  tRef: string;
  paymentData: any = null;

  options: KlashaOptions = {
    email: 'danstevea@gmail.com',
    phone_number: '+2348159991635',
    merchantKey: 'GByi/gkhn5+BX4j6uI0lR7HCVo2NvTsVAQhyPko/uK4=',
    amount: 1000,
    sourceCurrency: '',
    destinationCurrency: '',
    tx_ref: '' + Math.floor((Math.random() * 1000000000) + 1),
    businessId: '1',
    fullname: 'Dansteve Adekanbi',
    paymentDescription: '',
    kit: {
      currency: '',
      phone_number: '+2348159991635',
      email: 'danstevea@gmail.com',
      fullname: 'Dansteve Adekanbi',
      tx_ref: '',
      paymentType: '',
    }
  };
  loading: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController) { }

  async paymentInit(res: any) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await this.loading.present();
    this.paymentData = null;
    this.options.tx_ref = '' + Math.floor((Math.random() * 1000000000) + 1),
      console.log('Payment initialized');
  }

  async paymentDone(res: any) {
    console.log('Payment Done');
    console.log(res);
    this.paymentData = res;
    await this.loading.dismiss();
  }

}
