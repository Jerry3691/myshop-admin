import { ProductsListResolver } from '../../modules/products/products-list.resolver';
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
// import { IconsComponent } from '../../pages/icons/icons.component';
// import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
// import { TablesComponent } from '../../pages/tables/tables.component';
import { SharedModule } from "src-may-12/app/core/shared.module";
import { ToastrService } from "ngx-toastr";
import { TablesComponent } from "src-may-12/app/pages/tables/tables.component";
import { DashboardDataResolver } from "src-may-12/app/pages/dashboard/dashboard-data.resolver";
// import { RequestsListResolver } from "src/app/modules/requests/requests-list.resolver";
import { CategoriesListResolver } from "src-may-12/app/modules/categories/equipment-list.resolver";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    // IconsComponent,
    // MapsComponent
  ],
  providers: [
    ToastrService,
    // RequestsListResolver,
    CategoriesListResolver,
    DashboardDataResolver,
    ProductsListResolver
  ],
})
export class AdminLayoutModule {}
