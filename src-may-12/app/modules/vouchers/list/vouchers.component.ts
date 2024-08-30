import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from 'src-may-12/app/components/delete-confirmation/delete-confirmation.component';
import { ViewLinksComponent } from 'src-may-12/app/components/view-links/view-links.components';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
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
    this.voucherService.voucher$.subscribe((res: any) => {
      this.totalVouchers = [...res];
      // this.currentPage = +this.productService.currentPage;
      // this.perPage = 10;
      this.count = +this.voucherService.count;
      this.totalPage = this.getTotalPage(this.count)
      // this.totalPage = Math.ceil(this.count / this.perPage);
    });
    this.route.queryParams.subscribe((qp) => {
      this.currentPage = +qp.page || 1;

      if (qp.hasOwnProperty("type") && qp.type) {
        this.type = Number.parseInt(qp.type, 10);
        const voucher = this.totalVouchers
          .filter((eq) => {
            return eq.type == qp.type;
          })
          .map((eq) => eq);
        this.voucher = voucher.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        this.totalPage = this.getTotalPage(voucher.length)
      }
      else {
        this.voucher = this.totalVouchers.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        this.totalPage = this.getTotalPage(this.count)
      }
    });
    this.route.data.subscribe(d => {
      this.pageType = d.type == 'used' ? 1 : 0;
    })
  }
  onCheckboxChange(event: Event, id: number, index: number) {
    const checkbox = event.target as HTMLInputElement;
    let tick = 0;
    if (checkbox.checked) {
      tick = 1;
    } else {
      tick = 0;
    }
    this.voucherService.updateOrderedVoucherTick(id, tick).subscribe((res: any) => {
      console.log('updated');
      this.voucher[index].tick = tick;
    })
  }
  getTotalPage(count: number) {
    return Math.ceil(count / this.perPage)
  }

  deleteVoucher = (id: string, index: number) => {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.data = {
      title: "You are about to delete an voucher.",
      body: "This will delete the voucher permanently.",
      confirmButtonText: "Delete voucher",
      cancelButtonText: "Cancel",
    };

    modalRef.closed.subscribe((res) => {
      if (res) {
        this.voucherService.deleteVoucher(id, index).subscribe({
          next: ((_res: any) => {
            const index = this.voucher.findIndex(eq => eq.id === id);
            if (index > -1) {
              this.voucher.splice(index, 1);
            }
            this.toastrService.success("Voucher deleted successfully");
          }).bind(this),
          error: ((err: any) => {
            this.toastrService.error(err.message);
          }).bind(this),
        });
      }
    });
  };

  typeChange = (type: any) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        type: type,
      },
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


  changeStatus = (event: any): void => {
    let { po, newStatus, index } = event
    this.voucherService.changeVoucherOrderStatus(po, newStatus).subscribe({
      next: (res: any): void => {
        this.voucher = this.voucher.map(e => {
          if (e.purchaseOrderNumber == po && newStatus == 1) {
            e.isApprove = 1;
            return e
          } else if (e.purchaseOrderNumber == po && newStatus == 2) {
            e.isApprove = 2;
            return e
          } else {
            return e;
          }
        });
        console.log(this.voucher)
        this.toastrService.success('Status change successfully');
      },
      error: (error: HttpErrorResponse): void => {
        this.toastrService.error(error.error.message || 'Something went wrong');
      }
    })
  }

  viewLinks(eq: any) {
    let link = [];
    let name = (eq.company_name as string).toLowerCase()
    switch (name) {
      case 'ampol':
        link.push(eq.link);
        break;
      case 'bp':
        link.push(eq.code);
        break;
      case 'woolworths':
        link.push(eq.link);
        break;
      case 'coles':
        link.push(eq.link);
        break;
    }
    const ref = this.modalService.open(ViewLinksComponent, { size: 'xl' })
    ref.componentInstance.data = link;
  }


}
