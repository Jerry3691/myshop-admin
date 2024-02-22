import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { ConsultantsRoutingModule } from './Consultants-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConsultantsListComponent } from './consultants-list/consultants-list.component';
import { ConsultantsDetailResolver } from './consultants-detail.resolver';
import { ConsultantsListResolver } from './consultants-list.resolver';
import { RegisterComponent } from './register/register.component';
import { EmailComponent } from './consultants-list/email/email.component';
import { DirectivesModule } from 'src/app/core/directives/directives.module';

@NgModule({
  declarations: [
    ConsultantsListComponent, RegisterComponent, EmailComponent
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    ConsultantsRoutingModule,
    DragDropModule,
    DirectivesModule
  ],
  providers: [ConsultantsListResolver, ConsultantsDetailResolver]
})
export class ConsultantsModule { }
