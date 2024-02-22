import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthLayoutRoutes } from './auth-layout.routing'

import { LoginComponent } from '../../pages/login/login.component'
// import { RegisterComponent } from '../../pages/register/register.component'
import { SharedModule } from 'src/app/core/shared.module'
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component'
import { ToastrService } from 'ngx-toastr'
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component'
import { VerifyTokenResolver } from './verify-token.resolver'
import { UserResetPasswordComponent } from 'src/app/pages/user-reset-password/user-reset-password.component'
@NgModule({
  imports: [SharedModule, RouterModule.forChild(AuthLayoutRoutes)],
  declarations: [
    LoginComponent,
    // RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserResetPasswordComponent
  ],
  providers: [ToastrService, VerifyTokenResolver],
})
export class AuthLayoutModule {}
