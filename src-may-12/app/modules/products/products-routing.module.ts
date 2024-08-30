import { EditProductsComponent } from "./edit-products/edit-products.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddProductsComponent } from "./add-products/add-products.component";
import { ProductsDetailResolver } from "./products-detail.resolver";
import { ProductsListResolver } from "./products-list.resolver";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductOptionsResolver } from "./product-options.resolver";

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent,
    resolve: {
      data: ProductsListResolver,
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "add",
    component: AddProductsComponent,
    resolve: {
      data: ProductOptionsResolver,
    },
  },
  {
    path: "edit/:id",
    component: EditProductsComponent,
    resolve: {
      data: ProductsDetailResolver,
      options: ProductOptionsResolver,
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
