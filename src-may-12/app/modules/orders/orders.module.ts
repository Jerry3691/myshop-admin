import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src-may-12/app/core/shared.module';
import { OrdersListResolver } from './orders-list.resolver';
import { ComponentsModule } from 'src-may-12/app/components/components.module';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailsComponent } from './orders-details/order_details.component';
import { ListRowComponent } from './ list-row.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    ListRowComponent
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
