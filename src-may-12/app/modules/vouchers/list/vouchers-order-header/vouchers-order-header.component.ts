import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vouchers-order-header',
  templateUrl: './vouchers-order-header.component.html',
  styleUrls: ['./vouchers-order-header.component.css']
})
export class VouchersOrderHeaderComponent implements OnInit {
  type = '0';
  @Input() currentPage: any;
  search = '';

  date = this.getFormattedDate();

  constructor(
    private voucherService: vouchersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((qp) => {
      this.search = qp.search || "";
    });
  }
  exportOrderVouchers: VoidFunction = (): void => {
    this.voucherService.exportOrderVouchers(this.date, this.type);
  }

  getFormattedDate(d = new Date()) {
    const currentDate = new Date(d);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onSearch = (value: string) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: value,
        page: 1
      },
      queryParamsHandling: "merge",
    });
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
