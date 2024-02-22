import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { vouchersService } from 'src/app/core/services/vouchers.service';

@Injectable()
export class DetailVoucherResolver implements Resolve<any> {
 constructor(
  private voucherService:vouchersService
 ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const voucherId = route.params.id;
    return new Observable((observer) => {
      return this.voucherService.getVoucherDetail(voucherId).subscribe({
        next: ((res: any) => {
          observer.next({

            voucher: res.response,
            voucherId: voucherId,
          });
          observer.complete();
        }).bind(this),
        error: ((err: any) => {
          observer.complete();
        }).bind(this),
      });
    });
  }
}
