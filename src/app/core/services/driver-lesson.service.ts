import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DriverLessonService {
    private driveLessonSubject = new BehaviorSubject<any[]>([]);
    driverLesson$: Observable<any[]> = this.driveLessonSubject.asObservable();

    currentPage: number = 1;
    count=0;
    constructor(
        private httpService:HttpService
    ) { }
    
    getAllOrders(perPage: number=10,page:number=1,search=''):Observable<any>{
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
      return this.httpService.getRequest('driver-lesson/',params).pipe(
        tap((res: any) => {
          this.count=res.totalCount;
          this.currentPage=res.page;
          this.driveLessonSubject.next(res.data);
        })
      )
    }

    updateOrder(data:any):Observable<any>{
        return this.httpService.putRequest('driver-lesson/'+data.id,data).pipe(
            tap((res:any)=>{
                const order = this.driveLessonSubject.getValue();
        const index = order.findIndex((eq) => eq.id === data.id);
        if (index > -1) {
          order[index] = {
            ...order[index],
            ...res.data,
          };
          this.driveLessonSubject.next(order)
        }
            })
        )
    }

}