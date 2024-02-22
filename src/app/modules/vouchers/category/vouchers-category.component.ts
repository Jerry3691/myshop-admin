import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from 'src/app/components/delete-confirmation/delete-confirmation.component';
import { vouchersService } from 'src/app/core/services/vouchers.service';

@Component({
  templateUrl: './vouchers-category.component.html',
  styleUrls: ['./vouchers-category.component.css']
})
export class VouchersCategoryComponent implements OnInit {
  totalVouchers: any[] = [];
  voucher: any[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;
  search: string = '';
  type: any = '';
  pageType: number;

  constructor(
    private voucherService: vouchersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.voucherService.voucherCategory$.subscribe((res: any) => {
      this.totalVouchers = [...res.response];
      this.voucher=this.totalVouchers
      this.currentPage = res.page;
      this.perPage = res.perPage;
      this.count = res.totalCount;
      this.totalPage = this.getTotalPage(this.count)
    });
  }

  getTotalPage(count: number) {
    return Math.ceil(count / this.perPage)
  }

  deleteVoucherCategory = (id: string, index: number) => {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.data = {
      title: "You are about to delete an voucher category.",
      body: "This will delete the voucher category permanently.",
      confirmButtonText: "Delete voucher category",
      cancelButtonText: "Cancel",
    };

    modalRef.closed.subscribe((res) => {
      if (res) {
        this.voucherService.deleteVoucherCategory(id, index).subscribe({
          next: ((_res: any) => {
            const index = this.voucher.findIndex(eq => eq.id === id);
            if (index > -1) {
              this.voucher.splice(index, 1);
            }
            this.toastrService.success("Voucher category deleted successfully");
          }).bind(this),
          error: ((err: any) => {
            this.toastrService.error(err.message);
          }).bind(this),
        });
      }
    });
  };


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
