import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot,Resolve,RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { SettingService } from "src/app/core/services/setting.service";

@Injectable({
  'providedIn':"root"
})
export class SettingDetailResolver implements Resolve<any> {
  constructor(private settingService: SettingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    console.log('se')
    return new Observable((observer) => {
      return this.settingService.getSettingDetails().subscribe({
        next: ((res: any) => {
          observer.next({
            setting: res.response[0],
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
