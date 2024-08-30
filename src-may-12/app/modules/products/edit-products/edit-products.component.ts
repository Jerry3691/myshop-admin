import { environment } from "../../../../environments/environment";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "src-may-12/app/core/services/categories.service";
import { options, ProductModel } from "src-may-12/app/core/models/product.model";
import { ProductsService } from "src-may-12/app/core/services/products.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ModifiedCategoryList } from "src-may-12/app/core/models/category.model";
import { AddOptionsComponent } from "../add-options/add-options.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-products",
  templateUrl: "./edit-products.component.html",
  styleUrls: ["./edit-products.component.css"],
})
export class EditProductsComponent implements OnInit {
  @ViewChild("imageInputRef") imageInputRef: ElementRef<HTMLInputElement>;

  updateProductForm = this.fb.group({
    name: ["", Validators.required],
    short_description: [""],
    long_description: [""],
    quantity: [""],
    price: [""],
    category: ["", Validators.required],
    availability: ["1"],
    // size: [""],
    dimensions: [""],
    care_instructions: [""],
    material: [""],
    images: this.fb.array([]),
  });

  submitted = false;
  product: ProductModel;
  productId: string;

  images: any[] = [];
  selectedFiles?: FileList;
  previews: string[] = [];
  // media: any[] = [];
  serverUrl: string = environment.serverUrl;
  preImage: any[] = [];

  options: any[];
  optionsValue: any = {};
  optionArr: any[] = [];
  dynamincControls = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    enableCheckAll: false,
    allowSearchFilter: true,
  };
  deleteImages: any[] = [];

  categories: ModifiedCategoryList;
  selectedCategories: { data: any; label: any }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    public categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.productService.options$.subscribe((res: any) => {
      this.options = [...res];
    });
    this.categoriesService.modifiedCategoryDropdownList$.subscribe(
      (res: any) => {
        this.categories = res;
      }
    );

    this.route.data.subscribe((res) => {
      this.product = new ProductModel(res.data.product);
      this.productId = res.data.productId;
      this.preImage = this.product.images_url;
      this.options.forEach((e: any) => {
        if (!(`${e.group_name}` in this.optionsValue)) {
          this.optionsValue[`${e.group_name}`] = [];
          this.updateProductForm.addControl(
            `${e.group_name}`,
            new FormControl("")
          );
          this.dynamincControls.push(`${e.group_name}`);
        }
      });

      this.product.options.forEach((e, i) => {
        let data = {
          id: e.option_id,
          name: e.option_name,
        };

        this.optionArr.push({
          option_id: e.option_id,
          option_group_id: e.option_group_id,
          option_price_increment: 0,
        });

        let preData = Object.values(
          this.optionsValue[`${e.option_group_name}`]
        );
        preData.push(data);

        this.optionsValue[`${e.option_group_name}`] = preData;
      });

      this.product.categories.forEach((e) => {
        this.getSelectedCategories(this.categories, e.category_id);
      });

      this.updateProductForm.patchValue({
        name: this.product.name,
        short_description: this.product.short_description,
        long_description: this.product.long_description,
        quantity: this.product.quantity,
        price: this.product.price,
        category: this.selectedCategories,
        availability: this.product.availability.toString(),
        size: this.optionsValue.size,
        dimensions: this.product.dimensions,
        care_instructions: this.product.care_instructions,
        material: this.product.material,
        ...this.optionsValue,
      });
    });
  }

  private getSelectedCategories = (data, valueToFound) => {
    const stack = [...data];
    while (stack.length > 0) {
      const el = stack.pop();
      if (el.data === valueToFound) {
        this.selectedCategories.push(el);
        continue;
      }
      if (el.children.length > 0) {
        stack.push(...el.children);
      }
    }
  };

  open(option: any) {
    const modalRef = this.modalService.open(AddOptionsComponent);
    modalRef.componentInstance.option_group_id = option.id;
  }

  onItemSelect(item: any, optionGroupId) {
    this.optionArr.push({
      option_id: item.id,
      option_group_id: optionGroupId,
      option_price_increment: 0,
    });
  }

  onDeItemSelect(item: any) {
    let index = this.optionArr.findIndex((e) => item.id == e.option_id);
    if (index != -1) {
      this.optionArr.splice(index, 1);
    }
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    if (!this.images.length) {
      this.images.push(...event.target.files);
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        if (!this.images.find(this.findImage(event.target.files[i]))) {
          this.images.push(event.target.files[i]);
        }
      }
    }
    let filesAmount = this.images.length + this.preImage.length;
    this.previews = [];
    if (filesAmount < 6) {
      this.uploadFiles();
    } else {
      this.images.splice(5, filesAmount - 6);
      this.uploadFiles();
    }
    this.imageInputRef.nativeElement.value = null;
  }

  private uploadFiles() {
    if (this.images && this.images[0]) {
      const numberOfFiles = this.images.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.images[i]);
      }
    }
  }

  private findImage(file: File) {
    return (e: any) => {
      if (e.name == file.name) {
        return true;
      }
      return false;
    };
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.previews.splice(index, 1);
  }

  deleteImage(index: number): void {
    // this.preImage.push(this.media[index]);
    this.deleteImages.push(this.preImage[index]);
    this.preImage.splice(index, 1);
  }

  navigateBack() {
    window.history.back();
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.updateProductForm.invalid) {
      return;
    }

    const formData = new FormData();

    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        formData.append("images", this.images[i]);
      }
    } else {
      formData.append("images", null);
    }
    formData.append("images_url", JSON.stringify(this.deleteImages));
    formData.append("options", JSON.stringify(this.optionArr));
    // formData.append("category",this.updateProductForm.value.category.data);
    this.updateProductForm.value.category.forEach((e: any) => {
      formData.append("category[]", e.data);
    });
    for (const property in this.updateProductForm.value) {
      if (
        property != "image" &&
        property != "options" &&
        !this.dynamincControls.includes(property) &&
        property != "category"
      ) {
        formData.append(property, this.updateProductForm.value[property]);
      }
    }
    this.productService.updateProduct(this.productId, formData).subscribe({
      next: ((res: any) => {
        this.toastrService.success("Product updated successfully");

        this.submitted = false;
        this.router.navigateByUrl("/products");
      }).bind(this),
      error: ((err: any) => {
        this.toastrService.error(err().message || "Something went wrong");
      }).bind(this),
    });
  };
}
