import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderDetailResolver } from "./order-detail.resolver";
import { OrderDetailsComponent } from "./orders-details/order_details.component";
import { OrdersListResolver } from "./orders-list.resolver";
import { OrdersComponent } from "./orders.component";

const routes: Routes = [
  {
    path: "",
    component: OrdersComponent,
    resolve: [OrdersListResolver],
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: ":id",
    component: OrderDetailsComponent,
    resolve: [OrderDetailResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
