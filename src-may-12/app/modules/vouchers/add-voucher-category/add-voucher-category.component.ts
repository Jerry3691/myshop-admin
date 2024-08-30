import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';
import { voucherCategory } from '../voucher-category';

@Component({
  selector: 'app-add-voucher-category',
  templateUrl: './add-voucher-category.component.html',
  styleUrls: ['./add-voucher-category.component.css']
})
export class AddVoucherCategoryComponent implements OnInit {
  submitted: boolean = false
  id: any = null;
  type: number = 1;
  voucherFormCategory: FormGroup = this.fb.group({
    company_name: ['AMPOL', Validators.required],
    type: ['fuel', Validators.required],
    value: ['', Validators.required]
  })

  voucherCateogry:string[]=voucherCategory;
  constructor(private fb: FormBuilder, private voucherService: vouchersService, private toastrService: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      if (pm.has('id')) {
        this.type = 2;
        let category = this.voucherService.getVocherCategoryById(pm.get('id'));
        if (!category) { return this.navigateBack() }
        this.id = category.id;
        this.voucherFormCategory.patchValue({
          company_name: category.company_name,
          type: category.type,
          value: category.value
        })
      } else {
        this.type = 1;
      }
    })

  }


  navigateBack() {
    window.history.back();
  }

  onSubmit() {
    this.submitted = true;
    if (this.voucherFormCategory.invalid) {
      return;
    }
    const res$ = this.type == 1
      ? this.voucherService.addVoucherCategory(this.voucherFormCategory.value)
      : this.voucherService.editVoucherCategory(this.voucherFormCategory.value, this.id);
    res$.subscribe({
      next: (res: any) => {
        this.submitted = false;
        this.toastrService.success('Vouchers added successfully')
        this.voucherFormCategory.reset();
        if (this.type == 2) this.navigateBack();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
        this.toastrService.error('Something went wrong');
      }
    })
  }

}
