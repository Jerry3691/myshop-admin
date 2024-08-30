import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddVoucherComponent } from "./add-voucher/add-voucher.component";
import { VouchersComponent } from "./list/vouchers.component";
import { VoucherListResolver } from "./voucher-list.resolver";
import { DetailVoucherComponent } from "./detail-voucher/detail-voucher.component";
import { DetailVoucherResolver } from "./detail-voucher.resolver";
import { VouchersCategoryComponent } from "./category/vouchers-category.component";
import { VoucherCategoryListResolver } from "./voucher-category-list.resolver";
import { AddVoucherCategoryComponent } from "./add-voucher-category/add-voucher-category.component";
import { RequestsComponent } from "./requests/requests.component";
import { CancelRequestsComponent } from "./cancel-requests/cancel-requests.component";

const routes: Routes = [
  {
    path: "",
    component: VouchersComponent,
    resolve: { data: VoucherListResolver },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    data: { type: 'unused' }
  },
  {
    path: "orders",
    component: VouchersComponent,
    resolve: { data: VoucherListResolver },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    data: { type: 'used' }
  },
  {
    path: "requests",
    component: RequestsComponent,
    resolve: { data: VoucherListResolver },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    data: { type: 'requests' }
  },
  {
    path: "cancel-requests",
    component: CancelRequestsComponent,
    resolve: { data: VoucherListResolver },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    data: { type: 'cancel-requests' }
  },
  { path: "add", component: AddVoucherComponent },
  {
    path: "detail/:id",
    resolve: { data: DetailVoucherResolver },
    component: DetailVoucherComponent,
  },
  { path: "category/add", component: AddVoucherCategoryComponent },
  { path: "category/edit/:id", component: AddVoucherCategoryComponent },
  {
    path: "category",
    component: VouchersCategoryComponent,
    resolve: { data: VoucherCategoryListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VouchersRoutingModule { }
