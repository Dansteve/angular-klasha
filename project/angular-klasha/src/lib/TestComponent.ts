import { Component } from '@angular/core';
@Component({
  template: `<button type="text"
    class="btn btn-danger m-3"
    angular-klasha
    (paymentInit)="paymentInit()"
    (close)="paymentCancel()"
    (callBack)="paymentDone($event)"
    [class]="'btn btn-primary btn-lg'"
  >
    Pay
  </button>
  `
})

// @Component({
//   template: `<button type="text"
//     class="btn btn-danger m-3"
//     angular-klasha
//     [fullname]="'some-random-str'"
//     [phone_number]="'some-random-str'"
//     [paymentDescription]="'some-random-str'"
//     [email]="'mailexample@mail.com'"
//     [amount]="'1000000'"
//     [merchantKey]="'some-random-str'"
//     [businessId]="'some-random-str'"
//     [tx_ref]="'some-random-str'"
//     (paymentInit)="paymentInit()"
//     (close)="paymentCancel()"
//     (callBack)="paymentDone($event)"
//     [class]="'btn btn-primary btn-lg'"
//   >
//     Pay
//   </button>
//   `
// })
export class TestComponent {
  paymentInit() {
    return 'initialized';
  }
  paymentDone(ref: any) {
    return 'successful';
  }
  paymentCancel() {
    return 'failed';
  }
}


