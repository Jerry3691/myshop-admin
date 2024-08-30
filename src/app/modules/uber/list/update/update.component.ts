import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UberService } from 'src/app/core/services/uber.service';

@Component({
  templateUrl: 'update.component.html',
  styles:[
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

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private uberService: UberService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createCustomerOrderForm();

    // subscribe to changes in returnTripRequired and set validators for returnDateTimeOfTrips accordingly
    this.customerOrderForm?.get('returnTripRequired').valueChanges.subscribe((value) => {
      const returnDateTimeOfTripsControl = this.customerOrderForm.get('returnDateTimeOfTrips');
      if (value) {
        returnDateTimeOfTripsControl.setValidators([Validators.required, returnDateTimeValidator]);
      } else {
        returnDateTimeOfTripsControl.clearValidators();
      }
      returnDateTimeOfTripsControl.updateValueAndValidity({ emitEvent: false });
    });

    this.patchData(this.rideData);
  }


  onSubmit() {
    this.submit = true;
    if (this.customerOrderForm.invalid) {
      return;
    }
    this.uberService.updateUberOrder({
      id:this.rideData.id,
      purchaseOrderAmount:this.customerOrderForm.value.purchaseOrderAmount,
      status:this.customerOrderForm.value.status,
      pickupDateTimeOfTrips : this.customerOrderForm.value.pickupDateTimeOfTrips,
      returnDateTimeOfTrips : this.customerOrderForm.value.returnDateTimeOfTrips

    }).subscribe({
      next: (res) => {
        this.activeModal.close();
        this.toastrService.success('Uber Order updated');
        this.submit = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastrService.error('error');

      }
    })
  }

  private patchData(data: any) {
    this.customerOrderForm.patchValue(
      {
        name: data.name,
        mobileNumber: data.mobileNumber,
        purchaseOrderNumber: data.purchaseOrderNumber,
        purchaseOrderAmount: data.purchaseOrderAmount,
        scheduledTrip: data.scheduledTrip.toString(),
        returnTripRequired: data.returnTripRequired,
        notes: data.notes,
        pickupDateTimeOfTrips: this.convertDate(data.pickupDateTimeOfTrips),
        returnDateTimeOfTrips: data.returnDateTimeOfTrips?this.convertDate(data.returnDateTimeOfTrips):null,
        pickUpAddress: data.pickUpAddress,
        dropOffAddress: data.dropOffAddress,
        // consultantId: data.consultantId,
        status:data.status
      }
    )
  }

  private createCustomerOrderForm() {
    const purchaseOrderNumber = new Date().getTime();
    this.customerOrderForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9]*$')]],
      purchaseOrderNumber: [purchaseOrderNumber],
      purchaseOrderAmount: ['', Validators.required],
      scheduledTrip: ['1',Validators.required],
      returnTripRequired: [false],
      notes: [''],
      pickupDateTimeOfTrips: ['', Validators.required],
      returnDateTimeOfTrips: [null],

      pickUpAddress: ['', Validators.required],
      dropOffAddress: ['', Validators.required],
      // consultantId: ['', Validators.required],
      status:['',Validators.required]
    });
    this.customerOrderForm.get('returnDateTimeOfTrips').addValidators([returnDateTimeValidator])
  }
convertDate(value:string){
  const formattedDateTime = value.replace('T', ' ').substring(0, 16);

  return formattedDateTime;
}
  getDateFormat(date = new Date()) {
    
    const now = new Date(date);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

}

function returnDateTimeValidator(control: AbstractControl): { [key: string]: any } | null {
  const returnTripRequired = control.parent.get('returnTripRequired').value;
  const returnDateTimeOfTrips = control.value;

  if (returnTripRequired && !returnDateTimeOfTrips) {
    return { 'required': true };
  }

  return null;
}