import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'list-row-payment-mode',
  template: `

       <select [ngModel]="eq.order_payment_mode_" class="" [hidden]="!isStatusChange" #statusSelectElement class="custom-select"
         (change)="changeStatus($event.target.value)">
         <option [value]="0">None</option>
         <option [value]="1">Cash</option>
         <option [value]="2">Demand draft</option>
       </select>
       <span [class]="eq.order_payment_mode_ !==0 ? 'btn btn-success' : '' " #statusElement [hidden]="isStatusChange"
         (click)="isStatusChange=true">{{eq.order_payment_mode || "N/A"}}</span>

   `

})

export class ListRowPaymentModeComponent implements OnInit {
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
