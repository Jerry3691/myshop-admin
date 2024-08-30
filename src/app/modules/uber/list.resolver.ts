import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { UberService } from 'src/app/core/services/uber.service';

@Injectable()
export class ListResolver implements Resolve<any> {
  constructor(private uberService: UberService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const page = route.queryParams.page||1
    const perPage = 10
    const search = route.queryParams.search

    return new Observable((observer) => {
      return this.uberService
        .getAllUberOrders(perPage,page,search)
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
