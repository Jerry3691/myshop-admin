import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/core/shared.module';
import { UpdateComponent } from './list/update/update.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListResolver } from './list.resolver';
import { DriverLessonsRoutingModule } from './driver-lesson-routing.module';

@NgModule({
    imports: [SharedModule, ComponentsModule, DriverLessonsRoutingModule],
    exports: [],
    declarations: [ListComponent, UpdateComponent],
    providers: [ListResolver],
})
export class DriverLessonModule { }
