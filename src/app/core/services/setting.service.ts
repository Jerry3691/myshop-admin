
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Setting } from '../models/setting.model'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private settings: BehaviorSubject<Setting> = new BehaviorSubject(null);
  settings$: Observable<Setting> = this.settings.asObservable();
  logo: string = '';

  constructor(private router: Router, private httpService: HttpService) { }

  getSettingDetails = () => {
    return this.httpService.getRequest('site').pipe(tap((res: any) => {
      this.settings.next(res.response[0]);
      this.logo = this.httpService.serverUrl + res.response[0].logo;
    }));
  }
  updateSetting = (data: any) => {
    return this.httpService.patchRequest('site', data);
  }

}
