import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/core/shared.module';
import { UberRoutingModule } from './uber-routing.module';
import { UpdateComponent } from './list/update/update.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListResolver } from './list.resolver';
import { DatePipe } from '@angular/common';

@NgModule({
    imports: [SharedModule,UberRoutingModule,ComponentsModule],
    exports: [],
    declarations: [ListComponent,UpdateComponent],
    providers: [ListResolver,DatePipe],
})
export class UberModule { }
