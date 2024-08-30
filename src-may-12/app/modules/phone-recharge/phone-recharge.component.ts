import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PhoneRechargeService } from 'src-may-12/app/core/services/phone-recharge.service';

@Component({
  selector: 'app-phone-recharge',
  templateUrl: './phone-recharge.component.html',
  styleUrls: ['./phone-recharge.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PhoneRechargeComponent implements OnInit {

  totalOrder: any[] = [];
  orders: any[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private phoneRechargeService: PhoneRechargeService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.phoneRechargeService.phoneRecharge$.subscribe((res: any) => {
      this.totalOrder = [...res];
      this.currentPage = +this.phoneRechargeService.currentPage;
      this.perPage = 10;
      this.count = +this.phoneRechargeService.count;
      this.totalPage = Math.ceil(this.count / this.perPage);
    });

    this.route.queryParams.subscribe((qp) => {
      // this.search=qp.search||'';
      this.orders = this.totalOrder
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


}
