import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CategoriesService } from "src/app/core/services/categories.service";

@Injectable()
export class CategoriesListResolver implements Resolve<any> {
  constructor(private categoriesService: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const perPage = 10000;
    return new Observable((observer) => {
      return this.categoriesService.getCategoriesList(perPage).subscribe({
        next: ((_res: any) => {
          observer.next(1);
          observer.complete();
        }).bind(this),
        error: ((err: any) => {
          observer.complete();
        }).bind(this),
      });
    });
  }
}
