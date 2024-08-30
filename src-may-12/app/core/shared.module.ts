import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImagesStrToArrPipe } from './pipes/images-str-to-arr.pipe';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { DirectivesModule } from './directives/directives.module';
import { DateFormatPipe } from './pipes/dateFormat.pipe';
import { GetStatusNamePipe } from './pipes/getStatusName.pipe';
import { SortDataPipe } from './pipes/sort-data.pipe';


@NgModule({
  declarations: [ImagesStrToArrPipe, ArrayFilterPipe, DateFormatPipe,
    GetStatusNamePipe,
    SortDataPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DirectivesModule
  ],
  exports: [
    CommonModule,
    ImagesStrToArrPipe,
    NgbModule,
    NgbDropdownModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NgMultiSelectDropDownModule,
    ArrayFilterPipe,
    DirectivesModule,
    DateFormatPipe,
    GetStatusNamePipe,
    SortDataPipe
  ]
})
export class SharedModule { }
