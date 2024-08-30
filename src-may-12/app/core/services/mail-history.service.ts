import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MailHistoryService {
  private listSubject = new BehaviorSubject<any[]>([]);
  readonly list$: Observable<any[]> = this.listSubject.asObservable();

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
    return this.httpService.getRequest('mail-history/', params).pipe(
      tap((res: any) => {
        this.count = res.totalRows;
        this.currentPage = res.page;
        this.listSubject.next(res.response);
      })
    )
  }

  getMailHistoryByID(id: number): Observable<any> {
    return this.httpService.getRequest('mail-history/' + id);
  }

}
