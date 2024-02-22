import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { vouchersService } from 'src/app/core/services/vouchers.service';

@Injectable()
export class VoucherCategoryListResolver implements Resolve<any> {
  constructor(private voucherService: vouchersService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const { company, page } = route.queryParams
    const {type}=route.data
    const perPage = 10
    return new Observable((observer) => {
      return this.voucherService
        .getVoucherCategoryList()
        .subscribe({
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
