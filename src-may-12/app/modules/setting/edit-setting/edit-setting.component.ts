import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Setting } from "src-may-12/app/core/models/setting.model";
import { SettingService } from "src-may-12/app/core/services/setting.service";
import { environment } from "src-may-12/environments/environment";

export class ImageSnippet {
  type: string;
  name: string;
  size: number;
  constructor(public src: string, public file?: File) {
    if (file) {
      this.type = file.type;
      this.size = file.size;
      this.name = file.name;
    }
  }
}

@Component({
  selector: "app-edit-setting",
  templateUrl: "./edit-setting.component.html",
  styleUrls: ["./edit-setting.component.css"],
})
export class EditSettingComponent implements OnInit {

  updateSettingForm = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(255)]],
    website: [null, Validators.maxLength(255)],
    logo: null,
    email: [null, [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    address: [null, [Validators.required, Validators.maxLength(400)]],
    voucher_approve_amount: [0, [Validators.required, Validators.maxLength(10)]]
    // company_name: [null, [Validators.required, Validators.maxLength(40)]],
    // company_number: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.minLength(8), Validators.maxLength(15)]],
    // other_contact: [null, Validators.maxLength(40)],
    // PAN: [null, Validators.maxLength(10)],
    // additional_info: [null, Validators.maxLength(400)],
  });
  submitted = false;
  setting: Setting;
  error = ""
  errorKey = ""
  logo: any;
  selectedFile: ImageSnippet = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private settingService: SettingService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.settingService.settings$.subscribe(res => {
      this.setting = res;
      this.selectedFile = new ImageSnippet(environment.serverUrl + this.setting.logo);
    });

    this.patchFormData();
  }

  patchFormData() {
    this.updateSettingForm.patchValue({
      name: this.setting.name,
      email: this.setting.email,
      address: this.setting.address,
      website: this.setting.website,
      voucher_approve_amount: this.setting.voucher_approve_amount
      // logo: this.setting.logo,
      // company_name: this.setting.company_name,
      // company_number: this.setting.company_number,
      // other_contact: this.setting.other_contact,
      // PAN: this.setting.PAN,
      // additional_info: this.setting.additional_info
    });
  }

  handleLogo(files: any) {
    this.logo = files[0];
    const file: File = files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  onSubmit = () => {
    this.submitted = true;

    if (this.updateSettingForm.invalid) {
      return;
    }
    const formData = new FormData();
    if (this.logo != undefined) formData.append('image', this.logo);
    else formData.append('image', null);

    for (const property in this.updateSettingForm.value) {
      if (property != 'logo') { formData.append(property, this.updateSettingForm.value[property]); }
    }

    this.settingService
      .updateSetting(formData)
      .subscribe({
        next: ((res: any) => {
          this.toastrService.success("Setting updated successfully");
          this.submitted = false;
          this.error = ""
          this.errorKey = ""
          this.settingService.getSettingDetails().subscribe((data: any) => {
            this.setting = data.response[0];
            this.patchFormData();
          })
        }).bind(this),
        error: ((err: any) => {
          this.errorKey = err.key
          this.error = err.message
        }).bind(this),
      });
  };

}
