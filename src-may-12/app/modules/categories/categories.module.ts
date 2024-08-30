import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { CategoriesRoutingModule } from './categories-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesListResolver } from './equipment-list.resolver';
import { SharedModule } from 'src-may-12/app/core/shared.module';
import { ComponentsModule } from 'src-may-12/app/components/components.module';
import { CategoryDetailResolver } from './category-detail.resolver';
import {TreeSelectModule} from 'primeng/treeselect';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
@NgModule({
  declarations: [
    AddCategoryComponent,
    EditCategoryComponent,
    CategoriesListComponent,
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    FormsModule,

    ButtonModule,
    PanelModule,
    TreeSelectModule,
    // NgxTreeSelectModule.forRoot({
    //   idField: 'id',
    //   textField: 'name',
    //   expandMode: ExpandMode.Selection
    // })
  ],
  providers: [CategoryDetailResolver,CategoriesListResolver]
})
export class CategoriesModule { }
