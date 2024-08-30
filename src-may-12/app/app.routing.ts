import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { SettingDetailResolver } from "./modules/setting/setting-detail.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    resolve:{data:SettingDetailResolver},
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src-may-12/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    resolve:{data:SettingDetailResolver},
    canActivate: [NoAuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src-may-12/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
