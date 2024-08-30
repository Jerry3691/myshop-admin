import { ProductsService } from '../../core/services/products.service';
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { OrdersService } from 'src/app/core/services/orders.service';

@Injectable()
export class OrdersListResolver implements Resolve<any> {
  constructor(private orderService: OrdersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const category=route.queryParams.category
    const search = route.queryParams.search
    const page = route.queryParams.page
    const perPage = 10

    return new Observable((observer) => {
      return this.orderService
      .getOrdersList(perPage,page,search,category)
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
