import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vouchersService } from 'src/app/core/services/vouchers.service';

@Component({
  templateUrl: './cancel-requests.component.html'
})
export class CancelRequestsComponent implements OnInit {
  totalVouchers: any[] = [];
  voucher: any[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;
  search: string = '';
  pageType: number;

  constructor(
    private voucherService: vouchersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.voucherService.voucherCancelRequests$.subscribe((res: any) => {
      this.totalVouchers = [...res.response];
      this.voucher = this.totalVouchers
      this.currentPage = res.page;
      this.perPage = res.perPage;
      this.count = res.totalCount.totalCount;
      this.totalPage = this.getTotalPage(this.count)
    });
  }

  getTotalPage(count: number) {
    return Math.ceil(count / this.perPage)
  }


  onPageChange = (page: number) => {
    this.currentPage = page;
    this.navigateRoute();
  };

  private navigateRoute = () => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
      },
    });
  };


}
