import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhoneRechargeComponent } from "./phone-recharge.component";
import { PhoneRechargeResolver } from "./phone-recharge.resolver";

const routes: Routes = [
  {
    path: "",
    component: PhoneRechargeComponent,
    resolve: [PhoneRechargeResolver],
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneRechargeRoutingModule {}
