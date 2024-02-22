import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CategoriesService } from "src/app/core/services/categories.service";

@Injectable()
export class CategoryDetailResolver implements Resolve<any> {
  constructor(private categoriesService: CategoriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const catId = route.params.id;
    return new Observable((observer) => {
      return this.categoriesService.getCategoryDetails(catId).subscribe({
        next: ((res: any) => {
          observer.next({
            category: res.response,
            catId: catId,
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
