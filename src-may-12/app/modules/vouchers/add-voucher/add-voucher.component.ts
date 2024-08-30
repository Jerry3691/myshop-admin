import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ToastrService } from 'ngx-toastr';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';
import { voucherCategory } from '../voucher-category';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.css']
})
export class AddVoucherComponent implements OnInit {
  csvRecords: any;
  header: boolean = false;
  headerArr: Array<any> = [];

  submitted: boolean = false
  @ViewChild('fileImportInput') fileImportInput: any;
  voucherCateogry: string[] = voucherCategory;

  voucherForm: FormGroup = this.fb.group({
    company_name: ['AMPOL', Validators.required],
    type: ['2', Validators.required],
  })

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private fb: FormBuilder,
    private voucherService: vouchersService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  navigateBack() {
    window.history.back();
  }

  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.headerArr = (result.splice(0, 1))[0];
        this.csvRecords = result
        this.headerArr = this.modifyKeys(this.headerArr);
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }

  private modifyKeys(arr: Array<string>) {

    for (let i = 0; i < arr.length; i++) {

      switch (arr[i]) {
        case 'PIN':
          arr[i] = 'pin'
          break;
        case 'Serial':
          arr[i] = 'serial_number'
          break;
        case 'Expiry':
          arr[i] = 'expiry_date'
          break;
        case 'Voucher Code':
          arr[i] = 'code'
          break;
        case 'CardNumber':
          arr[i] = 'card_number'
          break;
        case 'PassLink':
          arr[i] = 'link'
          break;
        case 'ExpiryDate':
          arr[i] = 'expiry_date'
          break;
        case 'Denomination':
          arr[i] = 'value'
          break;
      }
    }
    return arr;
  }

  private modifiyArray(arr: Array<any>, header: Array<any>, company_name: string, type: string) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      obj[header[i]] = arr[i]
    }
    const value = obj['value'];
    const numericValue = parseFloat(value.replace('$', ''));

    obj['value'] = numericValue;
    obj['company_name'] = company_name;
    obj['type'] = type;
    return obj;
  }

  onSubmit() {
    this.submitted = true;
    if (this.voucherForm.invalid && this.csvRecords.length == 0) {
      return;
    }
    let dataArr = []
    this.csvRecords.forEach((e: any, i: number) => {
      if (e[0]) {
        dataArr.push(this.modifiyArray(e, this.headerArr, this.voucherForm.value.company_name, this.voucherForm.value.type))
      }
    })

    this.voucherService.addVoucher({ rows: dataArr }).subscribe({
      next: (res: any) => {
        this.submitted = false;
        // this.toastrService.success('Vouchers added successfully')
        this.voucherForm.reset();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Vouchers added successfully!",
        }).then(() => {
          window.history.back();
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
        this.toastrService.error('Something went wrong');
      }
    }
    )


  }
}
