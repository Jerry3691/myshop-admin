import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Product } from "../models/product.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class vouchersService {
  private voucherSubject = new BehaviorSubject<any[]>([]);
  voucher$: Observable<any[]> = this.voucherSubject.asObservable();
  private productDetailSubject = new BehaviorSubject<any>(null);
  productDetail$: Observable<any> = this.productDetailSubject.asObservable();
  private voucherCategorySubject = new BehaviorSubject<any[]>([]);
  voucherCategory$: Observable<any[]> = this.voucherCategorySubject.asObservable();
  private voucherRequestsSubject = new BehaviorSubject<any[]>([]);
  voucherRequests$: Observable<any[]> = this.voucherRequestsSubject.asObservable();
  private voucherCancelRequestsSubject = new BehaviorSubject<any[]>([]);
  voucherCancelRequests$: Observable<any[]> = this.voucherCancelRequestsSubject.asObservable();
  // private optionsSubject = new BehaviorSubject<Product>(null);
  // options$: Observable<Product> = this.optionsSubject.asObservable();

  isVoucherLoaded = false;
  currentPage: number = 1;
  count = 0;

  constructor(private httpService: HttpService) { }

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

  addVoucher = (formData: any) => {
    return this.httpService.postRequest("voucher", formData)
  };

  // getOptions = () => {

  //   return this.httpService.getRequest("products/options").pipe(
  //     tap((res: any) => {
  //       this.optionsSubject.next(res.response);
  //       // this.isProductLoaded = true;
  //     })
  //   );
  //   // } else {
  //   //   return this.product$;
  //   // }
  // };

  getVoucherList = (perPage: number = 10, page: number = 1, company: string = '', type: string = 'used', search = '') => {
    // if (!this.isProductLoaded) {
    let params = new HttpParams();
    if (perPage) {
      params = params.set("per_page", perPage);
    }

    if (page) {
      params = params.set("page", page);
    }

    if (company) {
      params = params.set("category", company);
    }

    if (type) {
      params = params.set("type", type == 'used' ? 1 : 0);
    }

    if (search) {
      params = params.set("search", search);
    }

    return this.httpService.getRequest("voucher", params).pipe(
      tap((res: any) => {
        this.count = res.count;
        this.currentPage = res.page;
        this.voucherSubject.next(res.response);
        this.isVoucherLoaded = true;
      })
    );
  };


  getVoucherRequests = (perPage: number = 10, page: number = 1, search = '') => {
    // if (!this.isProductLoaded) {
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

    return this.httpService.getRequest("/voucher/request-list", params).pipe(
      tap((res: any) => {
        this.voucherRequestsSubject.next(res);
      })
    );
  };

  getVoucherDetail = (voucherId: string) => {
    const voucher = this.voucherSubject.getValue();
    const index = voucher.findIndex((eq) => eq.id == voucherId);
    console.log(index)

    if (index > -1) {
      return of({ response: voucher[index] });
    } else {
      return this.httpService.getRequest("voucher/" + voucherId);
    }
  };

  // updateProduct = (productId: string, data: FormData) => {
  //   return this.httpService.patchRequest("products/" + productId, data).pipe(
  //     tap((res: any) => {
  //       const products = this.productSubject.getValue();
  //       const index = products.findIndex((eq) => eq.id === productId);
  //       if (index > -1) {
  //         products[index] = {
  //           ...products[index],
  //           ...res.response,
  //         };
  //       }
  //     })
  //   );
  // };

  deleteVoucher: Function = (voucherId: string, index: number) => {
    const voucher = this.voucherSubject.getValue();
    voucher.splice(index, 1);
    this.voucherSubject.next(voucher);
    return this.httpService.deleteRequest("voucher/" + voucherId);
  };


  exportVouchers: Function = (companyName: any): void => {
    this.httpService.downloadFile(`voucher/export-csv?company=${companyName}`)
  }
  exportOrderVouchers: Function = (date: Date, type: any): void => {
    if (type == 1)
      this.httpService.downloadFile(`voucher/export-orders-csv?date=${date}`)
    else
      this.httpService.downloadFile(`voucher/export-orders-csv`)
  }
  downloadVoucherTemplate: Function = (type: string): void => {
    this.httpService.downloadFile('voucher/export-csv-template/' + type)
  }

  getVoucherCategoryList: Function = (): Observable<any> => {
    return this.httpService.getRequest('voucher/list').pipe(tap((res) => {
      this.voucherCategorySubject.next(res);
    }));
  }

  deleteVoucherCategory: Function = (voucherId: string, index: number) => {
    const voucherCateogries: any = this.voucherCategorySubject.getValue();
    voucherCateogries.response.splice(index, 1);
    this.voucherCategorySubject.next(voucherCateogries);
    return this.httpService.deleteRequest("voucher/category/" + voucherId);
  };

  addVoucherCategory: Function = (payload: any) => {
    return this.httpService.postRequest("voucher/category", payload)
  };

  editVoucherCategory: Function = (payload: any, id: any) => {
    return this.httpService.patchRequest("voucher/category/" + id, payload)
  };

  getVocherCategoryById: Function = (id: any) => {
    const voucherCateogries: any = this.voucherCategorySubject.getValue();
    if (!voucherCateogries.response) return null;
    return voucherCateogries.response.find(e => e.id == id)
  }

  updateOrderedVoucherTick: Function = (id: any, tick: number): Observable<object> => {
    return this.httpService.patchRequest("voucher/tick/" + id, { tick });
  }

  sendEmail: Function = (payload: object): Observable<object> => {
    return this.httpService.postRequest("voucher/sent-email", payload)
  }

  changeVoucherOrderStatus: Function = (po: string, status: number): Observable<object> => {
    return this.httpService.patchRequest(`voucher/approve/${po}`, { status });
  }


  getCancelVoucherRequests = (perPage: number = 10, page: number = 1, search = '') => {
    let params = new HttpParams();
    if (perPage) { params = params.set("per_page", perPage); }
    if (page) { params = params.set("page", page); }
    if (search) { params = params.set("search", search); }

    return this.httpService.getRequest("/voucher/cancel-request-list", params).pipe(
      tap((res: any) => {
        this.voucherCancelRequestsSubject.next(res);
      })
    );
  };
}
