import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/core/shared.module';
import { OrdersListResolver } from './orders-list.resolver';
import { ComponentsModule } from 'src/app/components/components.module';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailsComponent } from './orders-details/order_details.component';
import { ListRowComponent } from './list-row.component';
import { ListRowPaymentStatusComponent } from './list-row-payment-status.component';
import { ListRowPaymentModeComponent } from './list-row-payment-mode.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    ListRowComponent,
    ListRowPaymentStatusComponent,
    ListRowPaymentModeComponent
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    ComponentsModule
  ],
  providers:[
    OrdersListResolver, OrderDetailResolver
  ]
})
export class OrdersModule { }
