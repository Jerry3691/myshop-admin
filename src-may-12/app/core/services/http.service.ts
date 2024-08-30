import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay } from "rxjs/operators";
import { environment } from "src-may-12/environments/environment";
import { LoaderService } from "./loader.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiUrl: string = environment.endPoint;
  serverUrl: string = environment.serverUrl;

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoaderService,
    private toastr:ToastrService
  ) {}

  getRequest = (url: string, params?: any) => {
    const http$ = this.httpClient.get(this.apiUrl + url, {
      params,
    });
    return this.loadingService
      .showLoaderUntilCompleted(http$)
      .pipe(shareReplay());
  };
  postRequest = (
    url: string,
    data: any,
    showLoader: boolean = true,
    params?: HttpParams
  ) => {
    const http$ = this.httpClient.post(this.apiUrl + url, data, {
      params,
    });
    if (showLoader) {
      return this.loadingService.showLoaderUntilCompleted(http$);
    }
    return http$;
  };
  patchRequest = (
    url: string,
    data: any,
    showLoader: boolean = true,
    params?: HttpParams
  ) => {
    const http$ = this.httpClient.patch(this.apiUrl + url, data, {
      params,
    });
    if (showLoader) {
      return this.loadingService.showLoaderUntilCompleted(http$);
    }
    return http$;
  };
  putRequest = (url: string, data: any, params?: HttpParams) => {
    return this.httpClient.put(this.apiUrl + url, data, {
      params,
    });
  };
  deleteRequest = (url: string, params?: HttpParams) => {
    const http$ = this.httpClient.delete(this.apiUrl + url, {
      params,
    });
    return this.loadingService.showLoaderUntilCompleted(http$);
  };

  downloadFile(url: string) {
    this.httpClient
      .get(this.apiUrl + url, { responseType: "blob" })
      .subscribe((response: any) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "order" + new Date().getTime() + ".csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },(error)=>{
        this.toastr.error(error.message)
      });
  }
}
