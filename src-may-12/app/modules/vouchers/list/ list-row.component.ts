import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'list-row',
  template: `

       <select [ngModel]="eq.isApprove" class="" [hidden]="!isStatusChange" #statusSelectElement class="custom-select"
         (change)="changeStatus($event.target.value)">
         <option [value]="1">Approve</option>
         <option [value]="2">Decline</option>
         <option [value]="3">Pending</option>
       </select>
   
       <span [class]="eq.isApprove == 1? 'btn btn-success' :eq.isApprove == 3?'btn btn-warning': 'btn btn-danger' " #statusElement [hidden]="isStatusChange"
       (click)="showDropDown()">{{eq.isApprove|statusName}}</span>
   `

})

export class ListRowComponent implements OnInit {
  @Input() eq: any;
  @Input() eqindex: any;
  @Output() statusChange: EventEmitter<any> = new EventEmitter()
  isStatusChange = false;
  @ViewChild('statusSelectElement') statusSelectElement: ElementRef;
  @ViewChild('statusElement') statusElement: ElementRef;
  constructor(
    private renderer: Renderer2,

  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target == this.statusElement.nativeElement || e.target == this.statusSelectElement.nativeElement) {
        if (this.eq.isApprove == 3) {
          this.isStatusChange = true;
        }
      }
      else if (e.target !== this.statusSelectElement.nativeElement && e.target !== this.statusElement.nativeElement) {
        this.isStatusChange = false
      }

    });
  }

  ngOnInit() { }

  changeStatus = (newStatus: any): void => {
    this.isStatusChange = false;
    this.statusChange.emit({ po: this.eq.purchaseOrderNumber, newStatus, index: this.eqindex })
  }
  showDropDown = (): void => {
    if (this.eq.isApprove == 3)
      this.isStatusChange = true;

  }
}