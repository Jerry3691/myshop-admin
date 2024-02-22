// PACKAGES
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

// MODELS
import { Orders } from "../models/orders.model";

// HTTP.SERVICE";
import { HttpService } from "./http.service";



@Injectable({
  providedIn: "root",
})
export class PhoneRechargeService {
  private phoneRechargeSubject = new BehaviorSubject<Orders[]>([]);
  phoneRecharge$: Observable<Orders[]> = this.phoneRechargeSubject.asObservable();

  currentPage: number = 1;
  count=0;

  constructor(private httpService: HttpService) {}

  sorter = (a: any, b: any) => {
    if (!a.name && b.name) {
      return 1;
    }
    if (a.name && !b.name) {
      return -1;
    }
    if (a.name && b.name && a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name && b.name && a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  };


  getPhoneRechargeList = (perPage: number=10,page:number=1,search:string='',category:string='') => {
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
      if(category){
        params = params.set("category", category);
      }
      return this.httpService.getRequest("phone", params).pipe(
        tap((res: any) => {
          this.count=res.totalRows;
          this.currentPage=res.page;
          this.phoneRechargeSubject.next(res.response);
        })
      );
  };
  getOrderDetails=(order_id:number)=>{
    return this.httpService.getRequest(`order/detail/${order_id}`)
  }


}
