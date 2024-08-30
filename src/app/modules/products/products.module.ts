import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ProductsDetailResolver } from './products-detail.resolver';
import { ProductsListResolver } from './products-list.resolver';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {TreeSelectModule} from 'primeng/treeselect';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { AddOptionsComponent } from './add-options/add-options.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductsComponent,
    EditProductsComponent,
    AddOptionsComponent
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    ProductsRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    ButtonModule,
    PanelModule,
    TreeSelectModule,
    DragDropModule
  ],
  providers: [ProductsListResolver, ProductsDetailResolver]
})
export class ProductsModule { }
