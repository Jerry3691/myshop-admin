import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AdminModel } from "src-may-12/app/core/models/admin.model";
import { AuthService } from "src-may-12/app/core/services/auth.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  passwordType = "password";
  newPasswordType = "password";
  confirmPasswordType = "password";
  changePasswordForm = this.fb.group({
    old_password: ["", [Validators.required]],
    new_password: [
      "",
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    ],
    cpassword: ["", [Validators.required]],
  });

  updateProfileForm = this.fb.group({
    first_name: ["", Validators.required],
    last_name: ["", Validators.required],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
        ),
      ],
    ],
    // phone: [
    //   "",
    //   [Validators.required, Validators.minLength(8), Validators.maxLength(15)],
    // ],
    // address: ["", Validators.required],
  });
  submitted = false;
  profileSubmitted = false;
  loginFailed = false;
  errMessage = "";

  authUser: AdminModel;

  userSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe((res) => {
      console.log(res)
      this.authUser = new AdminModel(res);
    });
  }

  onSubmit = () => {
    this.submitted = true;
    this.loginFailed = false;
    if (
      this.changePasswordForm.invalid ||
      this.changePasswordForm.value.new_password ===
        this.changePasswordForm.value.old_password ||
      this.changePasswordForm.value.new_password !==
        this.changePasswordForm.value.cpassword
    ) {
      return;
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
    this.authService
      .changePassword({
        old_password: this.changePasswordForm.value.old_password,
        new_password: this.changePasswordForm.value.new_password,
      })
      .subscribe({
        next: ((res: any) => {
          this.toastr.success("Password updated successfully");
          this.changePasswordForm.reset();
          this.submitted = false;
        }).bind(this),
        error: ((err: any) => {
          this.loginFailed = true;
          this.changePasswordForm.controls["old_password"].setErrors({
            incorrectPassword: true,
          });
          this.errMessage = err.message;
        }).bind(this),
      });
  };

  onOpenModal(content: any) {
    this.updateProfileForm.patchValue({
      first_name: this.authUser?.first_name,
      last_name: this.authUser?.last_name,
      email: this.authUser?.email,
    });

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (_result) => {
          this.authService.updateProfile({}).subscribe();
        },
        (_reason) => {}
      );
  }

  onSubmitUpdateForm = () => {
    this.profileSubmitted = true;
    if (this.updateProfileForm.invalid) {
      return;
    }
    this.authService.updateProfile(this.updateProfileForm.value).subscribe({
      next: ((res: any) => {
        this.toastr.success("Profile updated successfully");
        this.profileSubmitted = false;
        this.modalService.dismissAll();
      }).bind(this),
      error: ((err: any) => {
        this.loginFailed = true;
        this.updateProfileForm.controls[err.key].setErrors({
          alreadyExist: true,
        });
        this.errMessage = err.message;
      }).bind(this),
    });
  };

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
