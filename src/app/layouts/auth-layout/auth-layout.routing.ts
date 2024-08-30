import { Routes } from '@angular/router'
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component'
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component'
import { UserResetPasswordComponent } from 'src/app/pages/user-reset-password/user-reset-password.component'

import { LoginComponent } from '../../pages/login/login.component'
// import { RegisterComponent } from '../../pages/register/register.component'
import { VerifyTokenResolver } from './verify-token.resolver'

export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'verify-token',
    component: ResetPasswordComponent,
    data: { title: 'Verify Token', type: "admin" },
    resolve: {
      data: VerifyTokenResolver,
    },
  },
  {
    path: 'user/reset-password',
    component: UserResetPasswordComponent,
    data: { title: 'Verify Token', type: "user" },
    resolve: {
      data: VerifyTokenResolver,
    },
  },
]
