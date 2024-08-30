import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src-may-12/app/core/services/auth.service'
import { confirmPasswordValidator } from 'src-may-12/app/custom.validators'

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css'],
})
export class UserResetPasswordComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    cpassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    token: ['', [Validators.required]],
    id: ['', [Validators.required]],
  })
  submitted = false
  loginFailed = false
  errMessage = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: ((res: any) => {
        this.resetPasswordForm.patchValue({
          token: res.data.token,
          id: res.data.uuid,
        })
      }).bind(this),
    })
  }

  onSubmit = () => {
    this.submitted = true
    this.loginFailed = false
    if (
      this.resetPasswordForm.invalid ||
      this.resetPasswordForm.value.password !==
        this.resetPasswordForm.value.cpassword
    ) {
      return
    }
    this.authService.resetUserPassword(this.resetPasswordForm.value).subscribe({
      next: ((res: any) => {
        this.toastr.success(res.message)
        this.resetPasswordForm.reset()
        this.submitted = false
        this.router.navigate(['login'])
      }).bind(this),
      error: ((err: any) => {
        this.loginFailed = true
        this.errMessage = err.message
      }).bind(this),
    })
  }
}
