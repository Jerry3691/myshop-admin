import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryDetailResolver } from './category-detail.resolver';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoriesListResolver } from './equipment-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'add',
    component: AddCategoryComponent,
  },
  {
    path: 'edit/:id',
    resolve: {
      data: CategoryDetailResolver
    },
    component: EditCategoryComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
