import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ConsultantsService } from "src-may-12/app/core/services/consultants.service";

@Injectable()
export class ConsultantsDetailResolver implements Resolve<any> {
  constructor(private ConsultantsService: ConsultantsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    const userId = route.params.id;
    return new Observable((observer) => {
      return this.ConsultantsService.getConsultantsDetails(userId).subscribe({
        next: ((res: any) => {
          observer.next({
            user: res.response,
            userId: userId,
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
