import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularKlashaComponent } from './angular-klasha.component';
import { AngularKlashaDirective } from './angular-klasha.directive';
import { AngularKlashaService } from './angular-klasha.service';
import { MERCHANT_KEY, IS_TEST_MODE, BUSINESS_ID } from './klasha-keys';

@NgModule({
  imports: [CommonModule],
  exports: [
    AngularKlashaComponent,
    AngularKlashaDirective
  ],
  declarations: [
    AngularKlashaComponent,
    AngularKlashaDirective
  ],
  providers: [],
})
export class AngularKlashaModule {
  static forRoot(merchantKey: string, businessId: string, isTestMode: boolean = false): ModuleWithProviders<AngularKlashaModule> {
    return {
      ngModule: AngularKlashaModule,
      providers: [
        AngularKlashaService,
        { provide: MERCHANT_KEY, useValue: merchantKey },
        { provide: IS_TEST_MODE, useValue: isTestMode },
        { provide: BUSINESS_ID, useValue: businessId }
      ]
    };
  }
}
