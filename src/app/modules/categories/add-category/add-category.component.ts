import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Category } from "src/app/core/models/category.model";
import { CategoriesService } from "src/app/core/services/categories.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"],
  styles: [`
 :host ::ng-deep .p-treeselect {
      width:100%;
      display: inline-flex;
  }
  :host ::ng-deep .p-treeselect:hover {
      border-color:none;
  }
`],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm = this.fb.group({
    name: ["", Validators.required],
    parent_id: [null]
  });
  submitted = false;
  categoriesSubscription: Subscription;
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService.modifiedCategoryDropdownList$.subscribe(
      (res: any) => {
        console.log(res)
        this.categories = res;
      }
    );
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.addCategoryForm.invalid) {
      return;
    }
    const data={name:this.addCategoryForm.value.name,parent_id:this.addCategoryForm.value.parent_id?this.addCategoryForm.value.parent_id.data :null}
    this.categoriesService.addCategory(data)
      .subscribe({
        next: ((res: any) => {
          this.toastrService.success("Category added successfully");
          this.submitted = false;
          this.addCategoryForm.reset()
        }).bind(this),
        error: ((err: any) => {
          this.toastrService.error(err().message||'Something went wrong');

        }).bind(this),
      });
  };
}
