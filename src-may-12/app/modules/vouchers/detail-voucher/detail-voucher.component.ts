import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';

@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.css']
})
export class DetailVoucherComponent implements OnInit {
 voucher:any;
  voucherId: string;

  constructor(
    private voucherService:vouchersService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.voucher =Array.isArray(res.data.voucher)?res.data.voucher[0]:res.data.voucher;
      this.voucherId = res.data.voucherId;
    })

  }
  navigateBack() {
    window.history.back();
  }
}
