import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from 'src/app/components/delete-confirmation/delete-confirmation.component';
import { vouchersService } from 'src/app/core/services/vouchers.service';
import { SendEmailComponent } from './sendEmail/sendEmail.component';
import { ConsultantsService } from 'src/app/core/services/consultants.service';
import { EmailComponent } from 'src/app/components/email/email.component';

@Component({
  templateUrl: './requests.component.html'
})
export class RequestsComponent implements OnInit {
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
    private modal: NgbModal,
    private consultantService: ConsultantsService
  ) { }

  ngOnInit(): void {
    this.voucherService.voucherRequests$.subscribe((res: any) => {
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


  sendEmail = (request: any) => {
    const ref = this.modal.open(SendEmailComponent);
    ref.componentInstance.request = request;
  }

  sendVoucher(data: any, index: number) {
    if (data.status == 1) return;
    const inputData = {
      consultant_email: data.email,
      consultant_name: data.consultantName,
      client_name: data.client_name,
      client_email: data.client_email,
      company_name: data.company_name,
      purchaseOrderNumber: data.purchaseOrderNumber,
      request_voucher_id: data.id,
      amount: data.amount
    }
    this.consultantService.getCompanyVoucherPrices().subscribe((res: any) => {
      const modalRef = this.modal.open(EmailComponent, { size: 'xl', scrollable: true });
      modalRef.componentInstance.data = { ...inputData, ...res, type: 'request' };
      modalRef.result.then((res: any) => { if (res == true) { this.totalVouchers[index].status = 1 } })
    })
  }
}
