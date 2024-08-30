import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, PatternValidator, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src-may-12/app/core/services/auth.service'
import { SettingService } from 'src-may-12/app/core/services/setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  passwordType = "password";
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
        ),
      ],
    ],
    password: [
      '',
      [Validators.required],
    ],
  })
  submitted = false
  loginFailed = false
  errMessage = ''
  returnUrl = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public settingService:SettingService,
    private toastrService:ToastrService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('returnUrl')) {
        this.returnUrl = params.returnUrl
      }
    })
  }

  ngOnDestroy() {}

  onSubmit = () => {
    this.submitted = true
    this.loginFailed = false
    if (this.loginForm.invalid) {
      return
    }
    // if (this.loginForm.value.rememberMe) {
    //   sessionStorage.setItem(
    //     "remember",
    //     JSON.stringify({
    //       email: this.loginForm.value.email,
    //       password: this.loginForm.value.password,
    //     })
    //   );
    // } else {
    //   sessionStorage.removeItem("remember");
    // }
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: ((res: any) => {
        this.router.navigateByUrl(this.returnUrl);
      }).bind(this),
      error: ((err: any) => {
        this.loginFailed = true
        this.errMessage = err().message
        this.toastrService.error(this.errMessage)
      }).bind(this),
    })
    // .subscribe(
    //   (res) => {
    //     this.router.navigate([''])
    //     // }
    //   },
    //   (err) => {
    //     // this.loginFailed = true;
    //   },
    // )
  }
}
