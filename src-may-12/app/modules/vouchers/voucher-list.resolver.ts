import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { vouchersService } from 'src-may-12/app/core/services/vouchers.service';

@Injectable()
export class VoucherListResolver implements Resolve<any> {
  constructor(private voucherService: vouchersService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    let { company, page } = route.queryParams
    const { type } = route.data
    const perPage = 10
    const search = route.queryParams.search

    return new Observable((observer) => {
      let response$!: Observable<any>;
      switch (type) {
        case 'requests':
          response$ = this.voucherService.getVoucherRequests(perPage, page, search);
          break;
        case 'cancel-requests':
          response$ = this.voucherService.getCancelVoucherRequests(perPage, page, search);
          break;
        default:
          response$ = this.voucherService.getVoucherList(perPage, page, company, type, search);
          break;
      }


      return response$.subscribe({
        next: ((res: any) => {
          observer.next(1)
          observer.complete()
        }).bind(this),
        error: ((err: any) => {
          observer.complete()
        }).bind(this),
      })
    })
  }
}
