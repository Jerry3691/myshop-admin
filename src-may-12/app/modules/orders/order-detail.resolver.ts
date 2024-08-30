import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { OrdersService } from "src-may-12/app/core/services/orders.service";

@Injectable()
export class OrderDetailResolver implements Resolve<any> {
  constructor(private ordersService: OrdersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const orderId = route.params.id;
    return new Observable((observer) => {
      return this.ordersService.getOrderDetails(orderId).subscribe({
        next: ((res: any) => {
          observer.next({
            order: res.response,
            orderId: orderId,
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
