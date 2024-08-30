import { Router } from '@angular/router';
// PACKAGES
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ToastrService } from "ngx-toastr";
import { ModifiedCategoryList } from "src/app/core/models/category.model";
import { CategoriesService } from "src/app/core/services/categories.service";
import { ProductsService } from "src/app/core/services/products.service";

// ADD-OPTIONS
import { AddOptionsComponent } from './../add-options/add-options.component';
@Component({
  selector: "app-add-products",
  templateUrl: "./add-products.component.html",
  styleUrls: ["./add-products.component.css"],
})
export class AddProductsComponent implements OnInit {

  addProductForm = this.fb.group({
    name: ["",Validators.required],
    short_description:[''],
    long_description:[''],
    quantity:[''],
    price:['0'],
    category: ["",Validators.required],
    availability:['1'],
    options:['[]'],
    dimensions:[''],
    care_instructions:[''],
    material:[''],
    images: this.fb.array([]),
  });

  @ViewChild('imageInputRef') imageInputRef: ElementRef<HTMLInputElement>;

  submitted = false;
  images: any[] = [];
  selectedFiles?: FileList;
  previews: string[] = [];
  options: any[];
  optionArr: any[]=[];
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll:false,
    allowSearchFilter: true
  };
  categories: ModifiedCategoryList;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    public categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.categoriesService.modifiedCategoryDropdownList$.subscribe(
      (res: any) => {
        this.categories = res;
      }
    );

    this.productService.options$.subscribe((res: any) => {
      this.options=[...res];
    });
  }

  open(option:any) {
    const modalRef = this.modalService.open(AddOptionsComponent);
    modalRef.componentInstance.option_group_id = option.id;
  }

  onItemSelect(item: any,optionGroupId) {

      this.optionArr.push({
        option_id:item.id,
        option_group_id:optionGroupId,
        option_price_increment:0
      })
  }

  onDeItemSelect(item: any,optionGroupId) {
    let index=this.optionArr.findIndex((e)=>item.id==e.option_id)
    if(index){
      this.optionArr.splice(index,1);
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
    let filesAmount = this.images.length;
    this.previews = [];
    if (filesAmount < 6) {
      this.uploadFiles();
    } else {
      this.images.splice(5, this.images.length - 6);
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
    return (e:any) => {
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

  navigateBack(){
    window.history.back();
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.addProductForm.invalid) {
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
    if(this.addProductForm.value.price==''){
      this.addProductForm.value.price='0'
    }
    if(this.addProductForm.value.quantity==''){
      this.addProductForm.value.quantity='0'
    }
    formData.append("options",(JSON.stringify(this.optionArr)));
    
    this.addProductForm.value.category.forEach((e:any)=>{
      formData.append("category[]",e.data);
    })

    for (const property in this.addProductForm.value) {
      if (property != "images"&& property != "options" && property!='category') {
        formData.append(property, this.addProductForm.value[property]);
      }
    }

    this.productService.addProduct(formData).subscribe({
      next: ((res: any) => {
        this.toastrService.success("Product added successfully");
        this.submitted = false;
        this.addProductForm.reset();
        this.addProductForm.patchValue({
          category_id:''
        })
        this.previews=[];
        this.selectedFiles=null;
        this.router.navigateByUrl('/products')
      }).bind(this),
      error: ((err: any) => {
        this.toastrService.error(err().message||'Something went wrong')
      }).bind(this),
    });
  };

  get properties() {
    return this.addProductForm.controls["properties"] as FormArray;
  }

  addProperty() {
    const propertyForm = this.fb.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
    });
    this.properties.push(propertyForm);
  }

  deleteProperty(index: number) {
    this.properties.removeAt(index);
  }
}
