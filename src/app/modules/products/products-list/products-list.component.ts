import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DeleteConfirmationComponent } from "src/app/components/delete-confirmation/delete-confirmation.component";
import { Product } from "src/app/core/models/product.model";
import { CategoriesService } from "src/app/core/services/categories.service";
import { ProductsService } from "src/app/core/services/products.service";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"],
  styles: [
    `
      :host ::ng-deep .p-treeselect {
        width: 100%;
        display: inline-flex;
      }
      :host ::ng-deep .p-treeselect:hover {
        border-color: none;
      }
    `,
  ],
})
export class ProductsListComponent implements OnInit {
  totalProduct: Product[] = [];
  product: Product[] = [];
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 10;
  category: any = "";
  count: number = 1;
  search: string = "";
  categoryList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.productService.product$.subscribe((res: any) => {
      this.totalProduct = [...res]
      // res.map(e=>{
      //   e.category_name= (e.categories.map(e=>e.name).join(', '))
      //   return e;
      // });
      this.currentPage = +this.productService.currentPage;
      this.perPage = this.productService.perPage;
      this.count = +this.productService.count;
      this.totalPage = Math.ceil(this.count / this.perPage);
    });

    this.categoriesService.modifiedCategoryDropdownList$.subscribe(
      (category: any) => {
        this.categoryList = [
          {
            label: "All",
            data: "all",
            children: [],
          },
          ...category,
        ];
      }
    );
    this.route.queryParams.subscribe((qp) => {
      this.search = qp.search || "";
      this.product = this.totalProduct.slice();
      if (qp.hasOwnProperty("category") && qp.category) {
        this.category = this.categoryList.find(
          (e: any) => e.data == qp.category
        ); // this.category = Number.parseInt(qp.category, 10);
        // this.product = this.totalProduct
        // .filter((eq) => {
        //   return eq.category == qp.category;
        // })
        // .map((eq) => eq);
      }
    });
  }

  categoryChange = (event: any) => {
    this.category = event.node;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: event.node.data,
      },
      queryParamsHandling: "merge",
    });
  };
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
  viewAll = () => {
    this.currentPage = 1;
    this.perPage = 99999999999;
    this.navigateRoute(this.perPage)
  }
  navigateRoute = (perPage = 10) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
        perPage: perPage
      },
    });
  };
  deleteProduct = (id: string, index: number) => {
    const modalRef = this.modalService.open(DeleteConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.data = {
      title: "You are about to delete an product.",
      body: "This will delete the product permanently and will be revoked if has been assigned to any user.",
      confirmButtonText: "Delete product",
      cancelButtonText: "Cancel",
    };

    modalRef.closed.subscribe((res) => {
      if (res) {
        this.productService.deleteProduct(id, index).subscribe({
          next: ((_res: any) => {
            const index = this.product.findIndex((eq) => eq.id === id);
            if (index > -1) {
              this.product.splice(index, 1);
            }
            this.toastrService.success("Product deleted successfully");
          }).bind(this),
          error: ((err: any) => {
            this.toastrService.error(err.message);
          }).bind(this),
        });
      }
    });
  };

  onDrop(event: CdkDragDrop<any[]>) {
    // Get the target index of the dragged row
    const newIndex = event.currentIndex;

    // Get the ID and original index of the dragged row
    const id = event.item.data.id;
    const oldIndex = this.product.findIndex((user) => user.id === id);

    if (oldIndex !== newIndex) {
      // Update the order field of the rows in the client-side data structure
      if (oldIndex > newIndex) {
        for (let i = newIndex; i < oldIndex; i++) {
          this.product[i].product_order++;
        }
      } else {
        for (let i = oldIndex + 1; i <= newIndex; i++) {
          this.product[i].product_order--;
        }
      }
      this.product[oldIndex].product_order = newIndex + 1;

      // Send an HTTP request to update the order of rows in the database table
      this.productService.updateRowOrder({ id: id, newOrder: newIndex + 1 }).subscribe((response: any) => {
        moveItemInArray(this.product, event.previousIndex, event.currentIndex);
      });
    }
  }
}
