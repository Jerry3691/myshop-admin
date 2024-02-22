import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "src/app/core/services/products.service";

@Injectable()
export class ProductsDetailResolver implements Resolve<any> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const productId = route.params.id;
    return new Observable((observer) => {
      return this.productsService.getProductDetails(productId).subscribe({
        next: ((res: any) => {
          observer.next({
            product: res.response,
            productId: productId,
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
