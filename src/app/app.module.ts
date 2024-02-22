import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app.routing'
import { ComponentsModule } from './components/components.module'
import { NoAuthGuard } from './core/guards/no-auth.guard'
import { ApiInterceptor } from './core/interceptors/api.interceptor'
import { AuthGuard } from './core/guards/auth.guard';
import { environment } from 'src/environments/environment'

import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
