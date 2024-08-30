import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneRechargeRoutingModule } from './phone-recharge-routing.module';
import { PhoneRechargeComponent } from './phone-recharge.component';
import { SharedModule } from 'src-may-12/app/core/shared.module';
import { ComponentsModule } from 'src-may-12/app/components/components.module';
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
