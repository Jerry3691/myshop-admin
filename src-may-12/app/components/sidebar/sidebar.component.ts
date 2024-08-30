import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src-may-12/app/core/services/auth.service";
import { NotificationService } from "src-may-12/app/core/services/notification.service";
import { SettingService } from "src-may-12/app/core/services/setting.service";

export declare interface RouteInfo {
  path?: string;
  title: string;
  icon: string;
  class: string;
  display: boolean;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
    display: true,
  },
  {
    path: "/categories",
    title: "Categories",
    icon: "ni-bullet-list-67 text-red",
    class: "",
    display: true,
  },
  {
    path: "/products",
    title: "Products",
    icon: "ni-box-2 text-black",
    class: "",
    display: true,
  },
  
  {
    path: "/consultant",
    title: "Users",
    icon: "ni-badge text-blue",
    class: "",
    display: true,
  },

  {
    path: "/orders/product",
    title: "Product Orders",
    icon: "ni-bag-17 text-gray",
    class: "",
    display: true,
  },
  {
    path: "/setting",
    title: "Settings",
    icon: "ni-settings-gear-65 text-blue",
    class: "",
    display: true,
  },
];

// export const ROUTES: RouteInfo[] = [
//   {
//     path: "/dashboard",
//     title: "Dashboard",
//     icon: "ni-tv-2 text-primary",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/categories",
//     title: "Categories",
//     icon: "ni-bullet-list-67 text-red",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/products",
//     title: "Products",
//     icon: "ni-box-2 text-black",
//     class: "",
//     display: true,
//   },
//   {
//     title: "Vouchers",
//     icon: "fa fa-file text-green",
//     class: "",
//     display: true,
//     children: [
//       {
//         path: "/voucher/category",
//         title: "Category",
//         icon: "fa fa-file text-green",
//         class: "",
//         display: true,
//       },
//       {
//         path: "/voucher",
//         title: "Voucher Lists",
//         icon: "fa fa-file text-green",
//         class: "",
//         display: true,
//       },
//       {
//         path: "/voucher/requests",
//         title: "Voucher Requests",
//         icon: "fa fa-file text-green",
//         class: "",
//         display: true,
//       },
//       {
//         path: "/voucher/cancel-requests",
//         title: "Declined Voucher Order Lists",
//         icon: "fa fa-file text-green",
//         class: "",
//         display: true,
//       },
//     ]
//   },
//   {
//     path: "/consultant",
//     title: "Users",
//     icon: "ni-badge text-blue",
//     class: "",
//     display: true,
//   },

//   {
//     path: "/orders/product",
//     title: "Product Orders",
//     icon: "ni-bag-17 text-gray",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/vouchers/orders",
//     title: "Voucher Orders",
//     icon: "ni-bag-17 text-red",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/orders/uber",
//     title: "Uber Orders",
//     icon: "ni-bag-17 text-green",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/orders/lessons",
//     title: "Lessons Orders",
//     icon: "ni-bag-17 text-yellow",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/mail-history",
//     title: "Mail History",
//     icon: "fa fa-envelope text-blue",
//     class: "",
//     display: true,
//   },
//   {
//     path: "/setting",
//     title: "Settings",
//     icon: "ni-settings-gear-65 text-blue",
//     class: "",
//     display: true,
//   },
// ];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  isNewNotification = false;
  constructor(
    private router: Router,
    public authService: AuthService,
    public settingService: SettingService,

    private NotificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {     this.getNotification()
  }

  getNotification(): void {
    this.NotificationService.getList().subscribe();
  }
  ngOnInit() {
    this.NotificationService.notification.subscribe(res => { this.isNewNotification = res; this.cdr.detectChanges() })
 
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
