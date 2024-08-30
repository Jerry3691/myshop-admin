import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DeleteConfirmationComponent } from "src-may-12/app/components/delete-confirmation/delete-confirmation.component";
import { EmailComponent } from "src-may-12/app/components/email/email.component";
import { ConsultantsService } from "src-may-12/app/core/services/consultants.service";
// import { RegisterComponent } from "../register/register.component";
// import { EmailComponent } from "./email/email.component";

@Component({
  selector: "app-consultants-list",
  templateUrl: "./consultants-list.component.html",
  styleUrls: ["./consultants-list.component.css"],
})
export class ConsultantsListComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;
  isStatusChange: boolean = false;
  search: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultantService: ConsultantsService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.users = res.data.users

      this.currentPage = +res.data.page
      this.perPage = +res.data.perPage
      this.count = +res.data.count
      this.totalPage = Math.ceil(this.count / this.perPage)
    });

    this.route.queryParams.subscribe((qp) => {
      this.search = qp.search || "";
    });

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

  changeStatus = (consultantId: string, newStatus: string, index: number): void => {
    this.consultantService.updateConsultantStatus(consultantId, newStatus).subscribe({
      next: (res: any): void => {
        let user: any = this.users[index];
        user.isApprove = newStatus;
        this.users[index] = user;
        this.isStatusChange = false;
        this.toastrService.success('Status change successfully');

      },
      error: (error: HttpErrorResponse): void => {
        this.toastrService.error(error.error.message || 'Something went wrong');
      }
    })
  }

  deleteUser = (uuid: string) => {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.data = {
      title: "You are about to delete an user.",
      body: "This will delete the user permanently.",
      confirmButtonText: "Delete user",
      cancelButtonText: "Cancel",
    };

    modalRef.closed.subscribe((res) => {
      if (res) {
        this.consultantService
          .deleteConsultant(uuid, "", this.currentPage, this.perPage)
          .subscribe({
            next: ((res: any) => {
              this.users = res.response;
              this.currentPage = +res.page;
              this.perPage = +res.perPage;
              this.count = +res.totalCount;
              this.totalPage = Math.ceil(this.count / this.perPage);
              this.toastrService.success("User deleted successfully");
            }).bind(this),
            error: ((err: any) => {
              this.toastrService.error(err.message);
            }).bind(this),
          });
      }
    });
  };

  sendEmail(data: any) {
    const inputData = {
      consultant_email: data.email,
      consultant_name: (data.first_name + ' ' + data.last_name),
      client_name: '',
      client_email: '',
      company_name: '',
      purchaseOrderNumber: '',
      amount: null
    }
    this.consultantService.getCompanyVoucherPrices().subscribe((res: any) => {
      const modalRef = this.modalService.open(EmailComponent, { size: 'xl' });
      modalRef.componentInstance.data = { ...inputData, ...res, type: 'consultant' };
    })
  }
}
