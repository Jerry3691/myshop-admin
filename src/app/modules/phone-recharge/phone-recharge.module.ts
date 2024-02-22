import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneRechargeRoutingModule } from './phone-recharge-routing.module';
import { PhoneRechargeComponent } from './phone-recharge.component';
import { SharedModule } from 'src/app/core/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PhoneRechargeResolver } from './phone-recharge.resolver';


@NgModule({
  declarations: [
    PhoneRechargeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    PhoneRechargeRoutingModule
  ],
  providers:[PhoneRechargeResolver]
})
export class PhoneRechargeModule { }
