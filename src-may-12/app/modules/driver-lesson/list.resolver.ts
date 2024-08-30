import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { DriverLessonService } from 'src-may-12/app/core/services/driver-lesson.service';
import { UberService } from 'src-may-12/app/core/services/uber.service';

@Injectable()
export class ListResolver implements Resolve<any> {
  constructor(private driverLessonService: DriverLessonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const search = route.queryParams.search
    const page = route.queryParams.page||1
    const perPage = 10

    return new Observable((observer) => {
      return this.driverLessonService
        .getAllOrders(perPage,page,search)
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
