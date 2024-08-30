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
export class OrdersService {
  private ordersSubject = new BehaviorSubject<Orders[]>([]);
  orders$: Observable<Orders[]> = this.ordersSubject.asObservable();
  // private productDetailSubject = new BehaviorSubject<Product>(null);
  // productDetail$: Observable<Product> = this.productDetailSubject.asObservable();

  // private optionsSubject = new BehaviorSubject<any>(null);
  // options$: Observable<any> = this.optionsSubject.asObservable();

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


  getOrdersList = (perPage: number=10,page:number=1,search:string='',category:string='') => {
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
      return this.httpService.getRequest("order", params).pipe(
        tap((res: any) => {
          this.count=res.totalCount;
          this.currentPage=res.page;
          this.ordersSubject.next(res.response);
        })
      );
  };
  getOrderDetails=(order_id:number)=>{
    return this.httpService.getRequest(`order/detail/${order_id}`)
  }

  exportOrders:Function=():void=>{
    this.httpService.downloadFile('export-csv')
  }

  changeOrderStatus:Function=(id:number,status:number):Observable<any>=>{
    return this.httpService.getRequest(`order/change/status/${id}/${status}`);
  }
  changePaymentStatus:Function=(id:number,status:number):Observable<any>=>{
    return this.httpService.getRequest(`order/change/isPayment/${id}/${status}`);
  }
  changePaymentMode:Function=(id:number,status:number):Observable<any>=>{
    return this.httpService.getRequest(`order/change/paymentMode/${id}/${status}`);
  }
}
