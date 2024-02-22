import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductOptionsResolver implements Resolve<boolean> {
  constructor(private productsService:ProductsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable((observer) => {
      return this.productsService
        .getOptions()
        .subscribe({
          next: ((res: any) => {
            observer.next(true)
            observer.complete()
          }).bind(this),
          error: ((err: any) => {
            observer.complete()
          }).bind(this),
        })
    })
  }
}
