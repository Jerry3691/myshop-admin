
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultantsListResolver } from './consultants-list.resolver';
import { ConsultantsListComponent } from './consultants-list/consultants-list.component';
import { RegisterComponent } from './register/register.component';
import { ConsultantsDetailResolver } from './consultants-detail.resolver';

const routes: Routes = [
  // {
  //   path: '',
  //   component: GroupListComponent,
  //   resolve: {
  //     data: GroupListResolver
  //   },
  //   runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  // },
  {
    path: '',
    component: ConsultantsListComponent,
    resolve: {
      data: ConsultantsListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'add',
    component: RegisterComponent,
  },
  // {
  //   path: 'change/password/:id',
  //   component: ChangeUserPasswordComponent,
  // },
  // {
  //   path: 'mail/:id',
  //   component: MailUserComponent,
  //   resolve:{
  //     data:UserDetailResolver
  //   }
  // },
  {
    path: 'edit/:id',
    component: RegisterComponent,
    resolve:{consultant:ConsultantsDetailResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantsRoutingModule { }
