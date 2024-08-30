import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'list-row-user-status',
  template: `

            <select [ngModel]="user.isApprove" class="custom-select" [hidden]="!isStatusChange" (change)="changeStatus($event.target.value)" #statusSelectElement>
              <option [value]="1">Approve</option>
              <option [value]="2">Decline</option>
              <option [value]="3">Pending</option>
            </select>
            <span class="badge badge-dot mr-4"  (click)="isStatusChange=true" #statusElement [hidden]="isStatusChange">
              <i [class]="user.isApprove==1?'bg-success':user.isApprove==2?'bg-danger':'bg-warning'"></i>
              {{user.isApprove==1?'Approved':user.isApprove==2?'Declined':'Pending'}}
            </span>
   `
})

export class ListRowUserStatusComponent implements OnInit {
  @Input() user: any;
  @Input() eqindex: any;
  @Output() statusChange: EventEmitter<any> = new EventEmitter()
  isStatusChange = false;
  @ViewChild('statusSelectElement') statusSelectElement: ElementRef;
  @ViewChild('statusElement') statusElement: ElementRef;
  constructor(private renderer: Renderer2) {

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target == this.statusElement.nativeElement || e.target == this.statusSelectElement.nativeElement) {
        this.isStatusChange = true;
      }
      else if (e.target !== this.statusSelectElement.nativeElement && e.target !== this.statusElement.nativeElement) {
        this.isStatusChange = false
      }

    });
  }

  ngOnInit() { }

  changeStatus = (newStatus: any): void => {
    this.isStatusChange = false;
    this.statusChange.emit({ id: this.user.id, newStatus, index: this.eqindex });

  }
}
