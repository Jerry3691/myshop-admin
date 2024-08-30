import { NgModule } from '@angular/core';

import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { SharedModule } from 'src/app/core/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SettingDetailResolver } from './setting-detail.resolver';
import { SettingRoutingModule } from './setting-routing.module';


@NgModule({
  declarations: [
    EditSettingComponent
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    SettingRoutingModule
  ],
  providers: []
})
export class SettingModule { }
