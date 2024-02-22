import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateComponent } from './update/update.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverLessonService } from 'src/app/core/services/driver-lesson.service';

@Component({
  templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {

  list: any[] = []
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;
  search: string = "";

  constructor(
    private driverLessonService: DriverLessonService,
    private toastrService: ToastrService,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.driverLessonService.driverLesson$.subscribe((res: any) => {
      this.list = [...res]
      this.currentPage = +this.driverLessonService.currentPage;
      this.perPage = 10;
      this.count = +this.driverLessonService.count;
      this.totalPage = Math.ceil(this.count / this.perPage);
    });
    // this.uberService.getAllUberOrders().subscribe({
    //     next: (res: any) => {
    //         this.list = res.data;
    //     }
    // })

    this.route.queryParams.subscribe((qp) => {
      this.search = qp.search || "";
    });
  }
  update(data: any) {
    const modalRef = this.ngbModal.open(UpdateComponent, { size: 'xl' });
    modalRef.componentInstance.rideData = data;
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
}
