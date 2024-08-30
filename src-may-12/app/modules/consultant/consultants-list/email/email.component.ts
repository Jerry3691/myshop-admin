import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConsultantsService } from 'src-may-12/app/core/services/consultants.service';

@Component({
  selector: 'app-email',
  templateUrl: 'email.component.html',
  styleUrls: ['email.component.css']
})

export class EmailComponent implements OnInit {

  @Input() data: any;

  emailGroup: FormGroup = this.fb.group({
    consultant_email: ['', Validators.required],
    consultant_name: ['', Validators.required],
    client_email: [''],
    client_name: [''],
    company_name: ['', Validators.required],
    voucher: this.fb.array([]),
    purchaseOrderNumber: ['', Validators.required],
    notes: ['']
  });
  showAddButton = true;
  company_name = [];
  amount = [];
  isSubmit: boolean = false;
  responseObject: Object = new Object()

  constructor(
    private modal: NgbActiveModal,
    private ConsultantsService: ConsultantsService,
    private fb: FormBuilder,
    private tostr: ToastrService
  ) { }

  ngOnInit() {
    this.addVoucherItem();
    this.data.response.forEach(element => {
      if (this.responseObject.hasOwnProperty(element.company_name)) {
        this.responseObject[element.company_name].push(element.value);
      } else {
        this.responseObject[element.company_name] = [element.value];
      }
    });
    this.company_name = Object.keys(this.responseObject);
    this.amount = this.responseObject[this.company_name[0]].sort((a, b) => a - b);

    this.emailGroup.patchValue({
      consultant_email: this.data.email,
      consultant_name: (this.data.first_name + ' ' + this.data.last_name),
      company_name: this.company_name[0]
    })
  }

  close() {
    this.modal.close()
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.emailGroup.invalid) return;
    const payload = {
      consultant_id: this.data.id,
      consultantEmail: this.emailGroup.value.consultant_email,
      consultant_name: this.emailGroup.value.consultant_name,
      client_email: this.emailGroup.value.client_email,
      client_name: this.emailGroup.value.client_name,
      company_name: this.emailGroup.value.company_name,
      purchaseOrderNumber: this.emailGroup.value.purchaseOrderNumber,
      notes: this.emailGroup.value.notes,
      vouchers: this.emailGroup.value.voucher.map((e: any) => ({ company_name: this.emailGroup.value.company_name, voucher_quantity: parseInt(e.quantity), value: parseInt(e.value) }))
    }
    this.ConsultantsService.sendEmail(payload).subscribe({
      next: (res: HttpResponse<any>) => {
        this.isSubmit = false;
        this.modal.close();
        this.tostr.success('Vouchers send successfully', 'Success')
      },
      error: (error: any) => {
        this.tostr.error(error().message || 'Something went long', 'Error')
      }
    })
  }
  // Function to add a voucher item to the form array
  addVoucherItem() {
    const voucherArray = this.emailGroup.get('voucher') as FormArray;
    voucherArray.push(this.fb.group({
      value: ['', Validators.required],
      quantity: ['', Validators.required],
    }));
    if (voucherArray.length == this.amount.length) this.showAddButton = false;
  }

  // Function to remove a voucher item from the form array
  removeVoucherItem(index: number) {
    const voucherArray = this.emailGroup.get('voucher') as FormArray;
    voucherArray.removeAt(index);
    if (voucherArray.length < this.amount.length) this.showAddButton = true;

  }

  onCompanyNameChange(event: Event) {

    let el = <HTMLInputElement>event.target;
    this.amount = (<Array<number>>this.responseObject[el.value]).sort((a, b) => a - b);
    const voucherArrayLength = (this.emailGroup.get('voucher') as FormArray).controls.length;
    for (let index = 0; index < voucherArrayLength; index++) {
      this.removeVoucherItem(0)
    }

    this.emailGroup.patchValue({
      voucher: this.addVoucherItem()
    })
  }

}
