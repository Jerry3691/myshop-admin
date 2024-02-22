import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Admin, AdminModel } from "../models/admin.model";
import { FCMService } from "./fcm.service";
import { HttpService } from "./http.service";

const AUTH_DATA = "x-auth-token";
const AUTH_USER = "x-auth-admin-user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userSubject = new BehaviorSubject<AdminModel>(null);
  public authTokenSubject = new BehaviorSubject<string>(null);

  user$: Observable<Admin> = this.userSubject.asObservable();
  authToken$: Observable<string> = this.authTokenSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private fcmService: FCMService
  ) {
    this.isLoggedIn$ = this.authTokenSubject.pipe(map((token) => !!token));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((isLoggedIn) => !isLoggedIn));

    const token = localStorage.getItem(AUTH_DATA);
    const user = localStorage.getItem(AUTH_USER);
    if (token) {
      this.authTokenSubject.next(token);
    }
    if (user) {
      this.userSubject.next(new AdminModel(JSON.parse(user)));
    }
  }

  loginUser(credential: { email: string; password: string }): Observable<any> {
    return this.httpService
      .postRequest("auth/login", {
        ...credential,
        device_token: this.fcmService.token,
      })
      .pipe(
        tap((res: any) => {
          this.authTokenSubject.next(res.response.access_token);
          this.userSubject.next(new AdminModel(res.response));
          localStorage.setItem(AUTH_DATA, res.response.access_token);
          localStorage.setItem(AUTH_USER, JSON.stringify(res.response));
        })
      );
  }

  changePassword(credential: Object): Observable<any> {
    return this.httpService.patchRequest("auth/change-password", credential);
  }

  forgotPassword(credential: { email: string }): Observable<any> {
    return this.httpService.postRequest("auth/forgot-password", credential);
  }

  verifyToken(token: string): Observable<any> {
    const params = new HttpParams().set("token", token);
    return this.httpService.getRequest("auth/verify-token", params);
  }
  verifyUserToken(token: string): Observable<any> {
    const params = new HttpParams().set("token", token);
    return this.httpService.getRequest("users/verifyAuthToken", params);
  }

  resetPassword(data: Object): Observable<any> {
    return this.httpService.postRequest("auth/reset-password", data);
  }
  resetUserPassword(data: Object): Observable<any> {
    return this.httpService.putRequest("users/reset-password", data);
  }

  updateProfile(changes: Partial<AdminModel>): Observable<any> {
    return this.httpService.postRequest("auth/update-profile", changes).pipe(
      tap((_res) => {
        let currentValues: AdminModel = this.userSubject.getValue();
        currentValues = {
          ...currentValues,
          ...changes,
        };
        this.userSubject.next(currentValues);
        localStorage.setItem(AUTH_USER, JSON.stringify(currentValues));
      })
    );
  }

  isLoggedIn() {
    let isLoggedIn: boolean;
    this.isLoggedIn$.subscribe(
      (loggedInStatus) => (isLoggedIn = loggedInStatus)
    );
    return isLoggedIn;
  }

  logout() {
    if (this.isLoggedIn()) {
      return this.httpService
        .getRequest("auth/logout")
        .pipe(
          tap(() => {
            this.resetAuthUserData();
            localStorage.clear();
          })
        )
        .subscribe(
          (response) => {
            this.router.navigate(["login"]);

          },
          (err) => {
            this.resetAuthUserData();
            localStorage.clear();
            this.router.navigate(["login"]);
          }
        );
    } else {
      this.resetAuthUserData();
      this.router.navigate(["login"]);
    }
  }

  getAuthToken = () => {
    let authToken: string;
    this.authToken$.subscribe((token) => (authToken = token));
    return authToken;
  };

  get currentUser() {
    return this.userSubject.getValue();
  }

  resetAuthUserData = () => {
    this.authTokenSubject.next(null);
    this.userSubject.next(null);
    localStorage.clear();
  };

  registerUser(credential: {
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "isAdmin": boolean
  }): Observable<any> {
    return this.httpService
      .postRequest("auth/register", {
        ...credential,
        "device_token": ''
        // device_token: this.fcmService.token,
      });
  }
  updateConsultant(credential: {
    "first_name"?: string,
    "last_name"?: string,
    "password"?: string,
  }, id: string): Observable<any> {
    return this.httpService
      .putRequest("auth/" + id, credential);
  }
}
