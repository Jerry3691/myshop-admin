import { NgModule } from "@angular/core";

import { ListComponent } from "./list/list.component";
import { RouterModule } from "@angular/router";
import { ListResolver } from "./list.resolver";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ListComponent,
        resolve: { data: ListResolver },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DriverLessonsRoutingModule {}
