import { Component, EventEmitter, Input, Output } from '@angular/core';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';
import { voucherCategory } from '../../voucher-category';

@Component({
  selector: 'app-vouchers-header',
  templateUrl: './vouchers-header.component.html',
  styleUrls: ['./vouchers-header.component.css']
})
export class VouchersHeaderComponent {
  @Input() type: any;
  @Input() $event: any;
  @Output() typeChange: EventEmitter<any> = new EventEmitter();
  companyName = '0';
  voucherCateogry: string[] = voucherCategory;
  constructor(
    private voucherService: vouchersService,

  ) { }

  exportVouchers: VoidFunction = (): void => {
    this.voucherService.exportVouchers(this.companyName);
  }

  downloadVoucherTemplate = (type: string): void => {
    this.voucherService.downloadVoucherTemplate(type);
  }

  onTypeChange() {
    this.typeChange.emit(this.type)
  }

}