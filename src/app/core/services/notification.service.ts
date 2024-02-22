import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private listSubject = new BehaviorSubject<any[]>([]);
  readonly list$: Observable<any[]> = this.listSubject.asObservable();

  private newNotification = new BehaviorSubject<boolean>(false);

  get notification(): Observable<boolean> {
    return this.newNotification.asObservable();
  }

  set setNotification(value: boolean) {
    this.newNotification.next(value);
  }

  currentPage: number = 1;
  count = 0;

  constructor(
    private httpService: HttpService
  ) { }

  getList(perPage: number = 10, page: number = 1, search = ''): Observable<any> {
    let params = new HttpParams();
    if (perPage) {
      params = params.set("per_page", perPage);
    }
    if (page) {
      params = params.set("page", page);
    }
    if (search) {
      params = params.set("search", search);
    }
    return this.httpService.getRequest('notification/', params).pipe(
      tap((res: any) => {
        this.count = res.totalCount;
        this.currentPage = res.page;
        this.listSubject.next(res.response);
      })
    )
  }

  clearAll() {
    this.httpService.deleteRequest('notification/delete').subscribe(
      () => {
        this.count = 0;
        this.currentPage = 1;
        this.listSubject.next([]);
        this.newNotification.next(false)
      })
  }

  addNewNotificationInList(newNotification: any) {
    const currentNotifications = this.listSubject.getValue();
    const updatedNotifications = [newNotification, ...currentNotifications];
    this.listSubject.next(updatedNotifications);
  }

}
