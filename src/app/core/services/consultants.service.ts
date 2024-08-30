import { environment } from '../../../environments/environment';
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class ConsultantsService {
  serverUrl: string = environment.serverUrl;
  constructor(private router: Router, private httpService: HttpService) { }

  // addUser = (data: Partial<User>) => {
  //   return this.httpService.postRequest('users', data);
  // }
  addConsultants = (data: FormData) => {
    return this.httpService.postRequest("users", data);
  };

  // sendMailToUser = (data: any) => {
  //   return this.httpService.postRequest("users/mail",data);
  // };
  // changeUserPassword = (data: any) => {
  //   return this.httpService.postRequest("users/change/password", data);
  // };

  getConsultantsList = (search = "", page = 1, perPage = 10) => {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    if (page) {
      params = params.set("page", page);
    }
    if (perPage) {
      params = params.set("per_page", perPage);
    }
    return this.httpService.getRequest("users", params);
  };

  getConsultantsDetails = (consultantId: string) => {
    return this.httpService.getRequest("users/" + consultantId);
  };

  updateConsultantStatus = (consultantId: string, newStatus: string) => {
    return this.httpService.patchRequest("auth/accept-reject/", { userId: consultantId, type: newStatus });
  };

  // updateUser = (userId: string, formData: FormData) => {
  //   return this.httpService.putRequest("users/" + userId, formData);
  // };

  // updateUser = (equipmentId: string, data: Partial<User>) => {
  //   return this.httpService.putRequest('users/' + equipmentId, data);
  // }
  deleteConsultant = (id: string, search = "", page = 1, perPage = 10) => {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    if (page) {
      params = params.set("page", page);
    }
    if (perPage) {
      params = params.set("per_page", perPage);
    }
    return this.httpService.deleteRequest("users/" + id, params);
  };

  sendEmail = (payload: any) => {
    return this.httpService.postRequest('voucher/send-voucher-email-to-consultant', payload);
  }

  getCompanyVoucherPrices = () => {
    return this.httpService.getRequest('voucher/get-company-voucher-prices');
  }

}
