import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {private dashboardSubject = new BehaviorSubject<any>(null);
  dashboard$: Observable<any> = this.dashboardSubject.asObservable();
  loaded: boolean = false;

  constructor(private httpService: HttpService) {}

  getDashboardCount = () => {
    return this.httpService.getRequest("dashboard").pipe(
      map((res: any) => {
        return res.response;
      }),
      shareReplay()
    );
  };

  // setDashboardData = (data: any) => {
  //   this.dashboardSubject.next(data);
  //   this.loaded = true;
  // }

  // resetDashboardData = () => {
  //   this.dashboardSubject.next(null);
  //   this.loaded = false;
  // }
}
