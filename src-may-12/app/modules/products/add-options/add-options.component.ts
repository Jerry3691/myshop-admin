import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
// PACKAGES
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// CORE
import { ProductsService } from '../../../core/services/products.service';

@Component({
    selector: 'app-add-options',
    templateUrl: './add-options.component.html',
    styleUrls: ['./add-options.component.css']
})

export class AddOptionsComponent implements OnInit {

    @Input() option_group_id: number = 0;

    optionGroupForm: FormGroup = this.fb.group({
        options: this.fb.array([this.newOption()])
    })
  submitted: boolean=false;

    constructor(
        public modal: NgbActiveModal,
        private fb: FormBuilder,
        private productsService: ProductsService,
        private toastrService:ToastrService
    ) { }

    ngOnInit(): void {
    }

    get options(): FormArray {
        return this.optionGroupForm.get("options") as FormArray
    }

    newOption(): FormGroup {
        return this.fb.group({
            option: ['',Validators.required]
        })
    }

    addOptions() {
        this.options.push(this.newOption());
    }

    removeOption(i: number) {
        this.options.removeAt(i);
    }

    onSubmit() {
      this.submitted=true;
      if(this.optionGroupForm.invalid){
        return
      }
        const data = {
            "option_group_id": this.option_group_id,
            "options_name": this.optionGroupForm.value.options.map(e=>(e.option))
        }
        this.productsService.addOptions(data).subscribe(
          {
            next:(res)=>{
              this.submitted=false;
          this.toastrService.success('New options added successfully');
          this.modal.close();
        },
        error:(error)=>{
          console.error(error().message)
          this.toastrService.error(error().message)
        }
      })
    }

}
