import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UberService } from 'src-may-12/app/core/services/uber.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadNotesComponent } from 'src-may-12/app/components/read-notes/read-notes.components';
import { MailHistoryService } from 'src-may-12/app/core/services/mail-history.service';
import { ViewEmailDataComponent } from '../view-email-data/view-email-data.component';

@Component({
  templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {

  list: any[] = []
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;
  search = '';
  constructor(
    private mailService: MailHistoryService,
    private toastrService: ToastrService,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.mailService.list$.subscribe((res: any) => {
      this.list = [...res]
      this.currentPage = +this.mailService.currentPage;
      this.perPage = 10;
      this.count = +this.mailService.count;
      this.totalPage = Math.ceil(this.count / this.perPage);
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

  readnotes(notes: string) {
    const ref = this.ngbModal.open(ReadNotesComponent);
    ref.componentInstance.data = { notes, cancelButtonText: "Close" };
  }

  viewEmailData(emailData: string) {
    const ref = this.ngbModal.open(ViewEmailDataComponent, { size: 'xl', scrollable: true });
    ref.componentInstance.data = JSON.parse(emailData);
  }
}
