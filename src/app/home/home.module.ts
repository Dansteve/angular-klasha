import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AngularKlashaModule } from 'angular-klasha';
// import { AngularKlashaModule } from 'project/angular-klasha/src/public_api';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularKlashaModule.forRoot('GByi/gkhn5+BX4j6uI0lR7HCVo2NvTsVAQhyPko/uK4=', '1', true)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
