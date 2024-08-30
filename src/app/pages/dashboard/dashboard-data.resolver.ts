import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { DashboardService } from 'src/app/core/services/dashboard.service'

@Injectable()
export class DashboardDataResolver implements Resolve<any> {
  constructor(private dashboardService: DashboardService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    return new Observable((observer) => {
      return this.dashboardService
        .getDashboardCount()
        .subscribe({
          next: ((res: any) => {
            observer.next(res)
            observer.complete()
          }).bind(this),
          error: ((err: any) => {
            observer.complete()
          }).bind(this),
        })
    })
  }
}
