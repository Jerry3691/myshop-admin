import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { DeleteConfirmationComponent } from "src-may-12/app/components/delete-confirmation/delete-confirmation.component";
import { Category } from "src-may-12/app/core/models/category.model";
import { CategoriesService } from "src-may-12/app/core/services/categories.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.css"],
  animations: [
    trigger('collapse', [
      state('open', style({
        height: '*',
        opacity: 1,
        display:'block'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        display:'none'
      })),
      transition('open <=> closed', animate(200))
    ])
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  count: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}
  toggleRow(category) {
    category.show = !category.show;
  }
  ngOnInit(): void {
    // this.categoriesSubscription = this.categoriesService.categories$.subscribe(
    //   (res: any) => {
    //     this.categories = res;
    //   }
    // );
    this.categoriesSubscription = this.categoriesService.modifiedCategoryList$.subscribe(
      (res: any) => {
        this.categories = res;
      }
    );
  }

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

  deleteCategory = (id: number, index: number) => {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.data = {
      title: "You are about to delete a category.",
      body: "This will delete the category permanently.",
      confirmButtonText: "Delete category",
      cancelButtonText: "Cancel",
    };

    modalRef.closed.subscribe((res) => {
      if (res) {
        this.categoriesService.deleteCategory(id, index).subscribe({
          next: ((res: any) => {
            this.categoriesService.setCategoryValueAfterDeleteCategory(id);
            this.toastrService.success("Category deleted successfully");
          }).bind(this),
          error: ((err: any) => {
            this.toastrService.error(err().message||'Something went wrong');

          }).bind(this),
        });
      }
    });
  };

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
