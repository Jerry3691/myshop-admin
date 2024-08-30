import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DriverLessonService } from 'src-may-12/app/core/services/driver-lesson.service';

@Component({
  templateUrl: 'update.component.html',
  styles: [
    `
    .modal-header .btn-close {
      padding: calc(var(--bs-modal-header-padding-y) * 0.5) calc(var(--bs-modal-header-padding-x) * 0.5);
      margin: calc(-0.5 * var(--bs-modal-header-padding-y)) calc(-0.5 * var(--bs-modal-header-padding-x)) calc(-0.5 * var(--bs-modal-header-padding-y)) auto;
  }
  .btn-close:hover {
      color: #000;
      text-decoration: none;
      opacity: 0.75;
  }
  .btn-close {
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
    background: transparent url(./cross.svg) center/1em auto no-repeat;
    border: 0;
    border-radius: 0.375rem;
    opacity: 0.5;
}`
  ]
})

export class UpdateComponent implements OnInit {
  @Input() rideData: any;
  customerOrderForm: FormGroup;
  submit: boolean = false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private driverLessonService: DriverLessonService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createCustomerOrderForm();

    this.patchData(this.rideData);
  }


  onSubmit() {
    this.submit = true;
    if (this.customerOrderForm.invalid) {
      console.log(this.customerOrderForm)
      return;
    }
    this.driverLessonService.updateOrder({
      id: this.rideData.id,
      purchaseOrderAmount: this.customerOrderForm.value.purchaseOrderAmount,
      status: this.customerOrderForm.value.status,
      type:this.customerOrderForm.value.type
    }).subscribe({
      next: (res) => {
        this.activeModal.close();
        this.toastrService.success('Order Status Updated');
        this.submit = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastrService.error('error');

      }
    })
  }

  private patchData(data: any) {
    //console.log(data.type)
    this.customerOrderForm.patchValue(
      {
        name: data.name,
        mobileNumber: data.mobileNumber,
        email: data.email,
        purchaseOrderNumber: data.purchaseOrderNumber,
        purchaseOrderAmount: data.purchaseOrderAmount,
        address: data.address,
        notes: data.notes,
        type:data.type.toString(),
        status: data.status
      }
    )
  }

  private createCustomerOrderForm() {
    this.customerOrderForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9]*$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      purchaseOrderNumber: [''],
      purchaseOrderAmount: ['', Validators.required],
      notes: [''],
      address: ['', Validators.required],
      type:['1',Validators.required],
      status: ['', Validators.required]
    });
  }


}