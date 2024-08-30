import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { ConsultantsService } from 'src-may-12/app/core/services/consultants.service'

@Injectable()
export class ConsultantsListResolver implements Resolve<any> {
  constructor(private ConsultantsService: ConsultantsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const search = route.queryParams.search
    const page = route.queryParams.page
    const perPage = route.queryParams.perPage
    return new Observable((observer) => {
      return this.ConsultantsService
        .getConsultantsList(search, page, perPage)
        .subscribe({
          next: ((res: any) => {
            observer.next({
              users: res.response,
              page: res.page,
              perPage: res.perPage,
              count: res.count,
            })
            observer.complete()
          }).bind(this),
          error: ((err: any) => {
            observer.complete()
          }).bind(this),
        })
    })
  }
}
