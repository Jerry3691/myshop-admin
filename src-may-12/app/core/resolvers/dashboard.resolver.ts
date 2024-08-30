import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DashboardService } from "../services/dashboard.service";

@Injectable()
export class DashboardResolver implements Resolve<any> {
  loaded = false;
  constructor(private dashboardService: DashboardService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    if (!this.loaded) {
      setInterval(() => (this.loaded = false), 60000);
      this.loaded = true;
      return this.dashboardService.getDashboardCount().pipe(
        map((dashboardData) => {
          return dashboardData;
        }),
        catchError((err) => throwError(() => err))
      );
    }
  }
}
