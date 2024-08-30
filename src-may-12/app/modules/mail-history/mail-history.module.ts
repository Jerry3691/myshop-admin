import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { SharedModule } from 'src-may-12/app/core/shared.module';
import { MailHistoryRoutingModule } from './mail-history-routing.module';
import { ComponentsModule } from 'src-may-12/app/components/components.module';
import { ListResolver } from './list.resolver';
import { DatePipe } from '@angular/common';
import { ViewEmailDataComponent } from './view-email-data/view-email-data.component';

@NgModule({
  imports: [SharedModule, MailHistoryRoutingModule, ComponentsModule],
  exports: [],
  declarations: [ListComponent, ViewEmailDataComponent],
  providers: [ListResolver, DatePipe],
})
export class MailHistoryModule { }
