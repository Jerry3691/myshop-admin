import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { VouchersComponent } from './list/vouchers.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AddVoucherComponent } from './add-voucher/add-voucher.component';
import { SharedModule } from 'src-may-12/app/core/shared.module';
import { VoucherListResolver } from './voucher-list.resolver';
import { ComponentsModule } from 'src-may-12/app/components/components.module';
import { DetailVoucherComponent } from './detail-voucher/detail-voucher.component';
import { DetailVoucherResolver } from './detail-voucher.resolver';
import { VouchersHeaderComponent } from './list/vouchers-header/vouchers-header.component';
import { VouchersOrderHeaderComponent } from './list/vouchers-order-header/vouchers-order-header.component';
import { VouchersCategoryComponent } from './category/vouchers-category.component';
import { VoucherCategoryListResolver } from './voucher-category-list.resolver';
import { AddVoucherCategoryComponent } from './add-voucher-category/add-voucher-category.component';
import { RequestsComponent } from './requests/requests.component';
import { SendEmailComponent } from './requests/sendEmail/sendEmail.component';
import { ListRowComponent } from './list/ list-row.component';
import { CancelRequestsComponent } from './cancel-requests/cancel-requests.component';


@NgModule({
  declarations: [
    VouchersComponent,
    AddVoucherComponent,
    DetailVoucherComponent,
    VouchersHeaderComponent,
    VouchersOrderHeaderComponent,
    VouchersCategoryComponent,
    AddVoucherCategoryComponent,
    RequestsComponent,
    SendEmailComponent,
    ListRowComponent,
    CancelRequestsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VouchersRoutingModule,
    NgxCsvParserModule,
    ComponentsModule,
  ],
  providers: [VoucherListResolver, DetailVoucherResolver, VoucherCategoryListResolver]
})
export class VouchersModule { }
