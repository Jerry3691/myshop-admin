import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel, ModifiedCategoryList } from 'src-may-12/app/core/models/category.model';
import { CategoriesService } from 'src-may-12/app/core/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  styles: [`
  :host ::ng-deep .p-treeselect {
      width:100%;
      display: inline-flex;
  }
  :host ::ng-deep .p-treeselect:hover {
      border-color:none;
  }
`]
})
export class EditCategoryComponent implements OnInit {
  updateCategoryForm = this.fb.group({
    name: ["", Validators.required],
    parent_id:['null']
  });
  submitted = false;
  category: CategoryModel;
  catId: number;
  categories: ModifiedCategoryList;
  categoriesSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService.modifiedCategoryDropdownList$.subscribe(
      (res: any) => {
        this.categories = res;
      }
    );
    this.route.data.subscribe((res) => {
      this.category = new CategoryModel(res.data.category);
      this.catId = res.data.catId;

      this.updateCategoryForm.patchValue({
        name: this.category.name,
        parent_id:{data:this.category.parent_id,label:this.category.parent_name}
      });
    });
  }


  onSubmit = () => {
    this.submitted = true;
    if (this.updateCategoryForm.invalid) {
      return;
    }
    let data={
      name:this.updateCategoryForm.value.name,
      parent_id:this.updateCategoryForm.value.parent_id.data
    }
    this.categoriesService
      .updateCategory(this.catId, data)
      .subscribe({
        next: ((res: any) => {
          this.toastrService.success("Category updated successfully");
          this.submitted = false;
        }).bind(this),
        error: ((err: any) => {
          this.toastrService.error(err().message||'Something went wrong');
        }).bind(this),
      });
  };
}
