import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
        ),
      ],
    ],
  });
  submitted = false;
  loginFailed = false;
  errMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    public settingService:SettingService
  ) {}

  ngOnInit(): void {}

  onSubmit = () => {
    this.submitted = true;
    this.loginFailed = false;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: ((res: any) => {
        this.toastr.success(res.message);
        this.forgotPasswordForm.reset();
        this.submitted = false;
      }).bind(this),
      error: ((err: any) => {
        this.loginFailed = true;
        this.errMessage = err.message;
      }).bind(this),
    })
  }
}
