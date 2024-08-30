import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { SettingDetailResolver } from './setting-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: EditSettingComponent,
    resolve: {
      data: SettingDetailResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
