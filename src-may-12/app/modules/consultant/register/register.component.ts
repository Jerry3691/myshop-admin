import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src-may-12/app/core/services/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
submitted = false
loginFailed = false
errMessage = ''
returnUrl = ''
title='Add User';
isEdit=false;
id='';
  userData: any;
constructor(
  private authService: AuthService,
  private fb: FormBuilder,
  private toasterService: ToastrService,
  private router: Router,
  private route: ActivatedRoute
) { 
  
}
ngOnInit(): void {

    this.init()  
  }

  private init(){
    this.route.params.subscribe((p:any)=>{
      if(p.id){
        this.title='Edit User';
        this.isEdit=true;
        this.id=p.id;
        this.createEditConsultantForm();
        this.route.data.subscribe((res:any)=>{
          this.userData=res.consultant.user
          this.patchFormData(this.userData)
        })
      }else{
        this.title='Add User';
        this.isEdit=false;
        this.createAddConsultantForm();
      }
    })
  }

  private createAddConsultantForm():void{
    this.registerForm=this.fb.group({
      first_name:['',Validators.required],
      last_name:[''],
      email:['',[Validators.required,Validators.email,Validators.pattern( '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:['',[Validators.required,confirmPasswordValidator]],
      cpassword: ['', [Validators.required,confirmPasswordValidator]],  
    });
  }


 

  private createEditConsultantForm():void{
    this.registerForm=this.fb.group({
      first_name:['',Validators.required],
      last_name:[''],
      // email:['',[Validators.required,Validators.email,Validators.pattern( '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password:['',[Validators.pattern('')]],
    });
  }

  private patchFormData(data:any):void{
    this.registerForm.patchValue({
      first_name:data.first_name,
      last_name:data.last_name
    })
  }

  onSubmit = () => {
    this.submitted = true
    this.loginFailed = false 

    if (this.registerForm.invalid) {
      return;
    }
    if(this.isEdit){
      this.editConsultant(this.registerForm.value,this.id)
    }else{
      this.addNewConsultant();
    }
  }

  private addNewConsultant(){
    this.authService.registerUser({ ...this.registerForm.value,isAdmin:true }).subscribe(
      {
        next: ((res: any) => {
          this.toasterService.success('user added successfully');
          this.router.navigate(['./consultant']);
        }).bind(this),
        error: ((err: any) => {
          this.loginFailed = true
          this.errMessage = err().message
        }).bind(this),
      })
  }

  private editConsultant(data:any,id:string){
    const payload={};
if(this.userData.first_name!=data.first_name) payload['first_name']=data.first_name;
if(this.userData.last_name!=data.last_name) payload['last_name']=data.last_name;
if(data.password) payload['password']=data.password;

    this.authService.updateConsultant(payload,id).subscribe(
      {
        next: ((res: any) => {
          this.toasterService.success('consultant update successfully');
          this.router.navigate(['./consultant']);
        }).bind(this),
        error: ((err: any) => {
          this.loginFailed = true
          this.errMessage = err().message
        }).bind(this),
      })
  }
}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const cpassword = control.parent.get('confirm_password');

  if (!password || !cpassword) {
    return null;
  }

  if (cpassword.value === '') {
    return null;
  }

  if (password.value === cpassword.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};