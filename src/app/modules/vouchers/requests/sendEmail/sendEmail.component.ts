import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { vouchersService } from 'src/app/core/services/vouchers.service';

@Component({
  selector: 'app-send-email',
  templateUrl: 'sendEmail.component.html'
})

export class SendEmailComponent implements OnInit {
  @Input() request: any;
  formGroup: FormGroup;
  submit = false;

  constructor(
    public activeModal: NgbActiveModal,
    private voucherService: vouchersService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }


  ngOnInit() {
    if (!this.request) {
      // Handle the case where 'this.request' is not defined
      return;
    }

    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.formGroup.patchValue({
      email: this.request.email,
      message: ''
    });
  }


  onSubmit() {
    this.submit = true;
    if (this.formGroup.invalid) {
      return;
    }

    const payload = {
      email: this.request.email,
      data: { message: this.formGroup.value.message }
    }

    this.voucherService.sendEmail(payload).subscribe({
      next: (res: any) => {
        this.toastr.success("Email send successfully");
        this.activeModal.close()
      },
      error: (error: any) => {
        this.toastr.error(error || 'Something went wrong');
      }
    })

  }
}
