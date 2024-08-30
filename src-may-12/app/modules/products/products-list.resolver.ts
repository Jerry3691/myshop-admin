import { ProductsService } from '../../core/services/products.service';
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable()
export class ProductsListResolver implements Resolve<any> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    let category=route.queryParams.category
    if(isNaN(category)){
      category=''
    }
    const search = route.queryParams.search
    const page = route.queryParams.page
    const perPage = route.queryParams.perPage||10

    return new Observable((observer) => {
      return this.productsService
        .getProductList(perPage,page,search,category)
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
