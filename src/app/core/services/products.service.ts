// PACKAGES
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

// MODELS
import { Product } from "../models/product.model";

// HTTP.SERVICE";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private productSubject = new BehaviorSubject<Product[]>([]);
  product$: Observable<Product[]> = this.productSubject.asObservable();
  private productDetailSubject = new BehaviorSubject<Product>(null);
  productDetail$: Observable<Product> = this.productDetailSubject.asObservable();

  private optionsSubject = new BehaviorSubject<any>(null);
  options$: Observable<any> = this.optionsSubject.asObservable();

  isProductLoaded = false;
  currentPage: number = 1;
  perPage: number = 10;
  count=1;

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

  addProduct = (formData:FormData) => {
    return this.httpService.postRequest("products", formData).pipe(
      tap((res: any) => {
        this.count=res.totalCount;
        const products = this.productSubject.getValue();
        products.push(res.response);
        products.sort(this.sorter);

        this.productSubject.next([...products]);
      })
    );
  };

  // addEquipment = (data: Partial<Equipment>) => {
  //   return this.httpService.postRequest("products", data).pipe(
  //     tap((res: any) => {
  //       const equipments = this.equipmentSubject.getValue();
  //       equipments.push(res.response);
  //       equipments.sort(this.sorter);

  //       this.equipmentSubject.next([...equipments]);
  //     })
  //   );
  // };

  getOptions = () => {

      return this.httpService.getRequest("products/options").pipe(
        tap((res: any) => {
          this.optionsSubject.next(res.response);
          // this.isProductLoaded = true;
        })
      );
    // } else {
    //   return this.product$;
    // }
  };
  addOptions = (data:any) => {
      return this.httpService.postRequest("products/group/option",data).pipe(
        tap((res: any) => {
          let options:any[]=this.optionsSubject.getValue()
         let index=options.findIndex(e=>e.id==data.option_group_id)
         options[index].options=res.response;

          this.optionsSubject.next(options);
        })
      );
  };

  getProductList = (perPage: number=10,page:number=1,search:string='',category:string='') => {
    // if (!this.isProductLoaded) {
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
      return this.httpService.getRequest("products", params).pipe(
        tap((res: any) => {
          this.count=res.count.totalCount;
          this.currentPage=res.page;
          this.perPage=res.per_page
          this.productSubject.next(res.response);
          this.isProductLoaded = true;
        })
      );
    // } else {
    //   return this.product$;
    // }
  };

  getProductDetails = (productId: string) => {
    const products = this.productSubject.getValue();
    const index = products.findIndex((eq) => eq.id === productId);

    if (index > -1) {
      return of({ response: products[index] });
    } else {
      return this.httpService.getRequest("products/" + productId);
    }
  };

  updateProduct = (productId: string,data:FormData) => {
    return this.httpService.patchRequest("products/" + productId, data).pipe(
      tap((res: any) => {
        const products = this.productSubject.getValue();
        const index = products.findIndex((eq) => eq.id === productId);
        if (index > -1) {
          products[index] = {
            ...products[index],
            ...res.response,
          };
        }
      })
    );
  };

  deleteProduct = (productId: string, index: number) => {
    const products = this.productSubject.getValue();
    products.splice(index, 1);
    this.productSubject.next(products);
    return this.httpService.deleteRequest("products/" + productId);
  };

  updateRowOrder=(data:any)=>{
    return this.httpService.patchRequest('products/updateRowOrder',data)
  }
}
