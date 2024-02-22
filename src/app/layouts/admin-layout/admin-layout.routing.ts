import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { DashboardDataResolver } from "src/app/pages/dashboard/dashboard-data.resolver";
import { CategoriesListResolver } from "src/app/modules/categories/equipment-list.resolver";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    resolve: {
      dashboardData: DashboardDataResolver,
    },
  },
  { path: "user-profile", component: UserProfileComponent },
  {
    path: "",
    resolve: {
      data: CategoriesListResolver,
    },
    children: [
      {
        path: "products",
        loadChildren: () =>
          import("src/app/modules/products/products.module").then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("src/app/modules/categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: "voucher",
        loadChildren: () =>
          import("src/app/modules/vouchers/vouchers.module").then(
            (m) => m.VouchersModule
          ),
      },
      {
        path: "vouchers",
        loadChildren: () =>
          import("src/app/modules/vouchers/vouchers.module").then(
            (m) => m.VouchersModule
          ),
      },
      {
        path: "orders/product",
        loadChildren: () =>
          import("src/app/modules/orders/orders.module").then(
            (m) => m.OrdersModule
          ),
      },

      {
        path: "orders/uber",
        loadChildren: () =>
          import("src/app/modules/uber/uber.module").then(
            (m) => m.UberModule
          ),
      },
      {
        path: "orders/lessons",
        loadChildren: () =>
          import("src/app/modules/driver-lesson/driver-lesson.module").then(
            (m) => m.DriverLessonModule
          ),
      },
      {
        path: "mail-history",
        loadChildren: () =>
          import("src/app/modules/mail-history/mail-history.module").then(
            (m) => m.MailHistoryModule
          ),
      },
    ],
  },
  // {
  //   path: "recharge_request",
  //   loadChildren: () =>
  //     import("src/app/modules/phone-recharge/phone-recharge.module").then((m) => m.PhoneRechargeModule),
  // },
  {
    path: "consultant",
    loadChildren: () =>
      import("src/app/modules/consultant/consultants.module").then((m) => m.ConsultantsModule),
  },
  // {
  //   path: "groups",
  //   loadChildren: () =>
  //     import("src/app/modules/groups/groups.module").then((m) => m.GroupsModule),
  // },
  // {
  //   path: "requests",
  //   loadChildren: () =>
  //     import("src/app/modules/requests/requests.module").then(
  //       (m) => m.RequestsModule
  //     ),
  // },
  // {
  //   path: "invoices",
  //   loadChildren: () =>
  //     import("src/app/modules/invoices/invoices.module").then(
  //       (m) => m.InvoicesModule
  //     ),
  // },
  {
    path: "setting",
    // resolve: {
    //   equipment: Resolver
    // },
    loadChildren: () =>
      import("src/app/modules/setting/setting.module").then(
        (m) => m.SettingModule
      ),
  },
  // {
  //   path: "notifications",
  //   loadChildren: () =>
  //     import("src/app/modules/notifications/notifications.module").then(
  //       (m) => m.NotificationsModule
  //     ),
  // },
  // { path: "tables", component: TablesComponent },
  // { path: 'icons', component: IconsComponent },
  // { path: 'maps', component: MapsComponent },
];
