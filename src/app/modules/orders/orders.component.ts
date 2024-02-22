import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Orders } from 'src/app/core/models/orders.model';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  totalOrder: Orders[] = [];
  orders: Orders[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;

  search: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private toastrService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.ordersService.orders$.subscribe((res: any) => {
      this.totalOrder = [...res];
      this.currentPage = +this.ordersService.currentPage;
      this.perPage = 10;
      this.count = +this.ordersService.count;
      this.totalPage = Math.ceil(this.count / this.perPage);
    });

    this.route.queryParams.subscribe((qp) => {
      this.search = qp.search || '';
      this.orders = this.totalOrder.slice();
      // if (qp.hasOwnProperty("category") && qp.category) {
      //   this.category = Number.parseInt(qp.category, 10);
      //   this.product = this.totalProduct
      //   .filter((eq) => {
      //     return eq.category == qp.category;
      //   })
      //   .map((eq) => eq);
      // }
    });
  }
  changeStatus = (event: any): void => {
    let { orderId, newStatus, index } = event
    this.ordersService.changeOrderStatus(orderId, newStatus).subscribe({
      next: (res: any): void => {
        let order: any = this.orders[index];
        order.order_status = newStatus == '1' ? 'Order Place' : newStatus == 2 ? 'Out for delivery' : 'Completed order';
        order.order_status_ = newStatus;
        this.orders[index] = order;
        this.toastrService.success('Status change successfully');
      },
      error: (error: HttpErrorResponse): void => {
        this.toastrService.error(error.error.message || 'Something went wrong');
      }
    })
  }
  // categoryChange = (event:any) => {
  //   console.log(event.node)
  //   this.category=event.node
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       category: event.node.data,
  //     },
  //   });
  // };
  onSearch = (value: string) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: value,
        page: 1
      },
    });
  };
  onPageChange = (page: number) => {
    this.currentPage = page;
    this.navigateRoute();
  };

  navigateRoute = () => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,

      },
    });
  };


  exportOrders: VoidFunction = (): void => {
    this.ordersService.exportOrders()
    // .subscribe({
    //   next:():void=>{
    //     this.toastrService.success('Orders exported successfully');
    //   },
    //   error:(error:any):void=>{
    //     this.toastrService.error(error().message||'Orders exportation failed');
    //   }
    // })
  }

}
