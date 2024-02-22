import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UberService {
    private uberSubject = new BehaviorSubject<any[]>([]);
    uber$: Observable<any[]> = this.uberSubject.asObservable();

    currentPage: number = 1;
    count=0;
    constructor(
        private httpService:HttpService
    ) { }
    
    getAllUberOrders(perPage: number=10,page:number=1,search=''):Observable<any>{
        let params = new HttpParams();
      if (perPage) {
        params = params.set("per_page", perPage);
      }
      if(page){
        params = params.set("page", page);
      }
      if(search){
        params = params.set("search", search);
      }
      return this.httpService.getRequest('uber/',params).pipe(
        tap((res: any) => {
          this.count=res.totalCount;
          this.currentPage=res.page;
          this.uberSubject.next(res.data);
        })
      )
    }

    updateUberOrder(data:any):Observable<any>{
        return this.httpService.patchRequest('uber/'+data.id,data).pipe(
            tap((res:any)=>{
                const rides = this.uberSubject.getValue();
        const index = rides.findIndex((eq) => eq.id === data.id);
        if (index > -1) {
          rides[index] = {
            ...rides[index],
            ...res.data,
          };
          this.uberSubject.next(rides)
        }
            })
        )
    }

}