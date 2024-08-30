import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { OrdersService } from 'src-may-12/app/core/services/orders.service';

@Component({
  selector: 'list-row',
  template: `

       <select [ngModel]="eq.order_status_" class="" [hidden]="!isStatusChange" #statusSelectElement class="custom-select"
         (change)="changeStatus($event.target.value)">
         <option [value]="1">Order Place</option>
         <option [value]="2">Out for delivery</option>
         <option [value]="3">Completed Order</option>
       </select>
       <span [class]="eq.order_status_ == 3? 'btn btn-success' : '' " #statusElement [hidden]="isStatusChange"
         (click)="isStatusChange=true">{{eq.order_status || "N/A"}}</span>
   
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
    private ordersService: OrdersService,

  ) {
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
    this.statusChange.emit({ orderId: this.eq.order_id, newStatus, index: this.eqindex })

  }
}