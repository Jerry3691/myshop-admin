import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { AuthService } from '../services/auth.service'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Set Auth Token in Header
    if (this.authService.isLoggedIn()) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getAuthToken(),
        ),
      })
    }

    let apiReq = request.clone({ url: `${request.url}` })

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    })
    apiReq = request.clone({ url: `${request.url}` })

    // return next.handle(apiReq);
    // return next.handle(apiReq).pipe(
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //     }
    //     return event;
    //   })
    // );

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event
      }),
      catchError((err: any) => {
        if (err.status === 401) {
          this.authService.logout()
        }
        const data = {
          reason:
            err && err.error && err.error.message ? err.error.message : '',
          status: err.status,
        }
        return throwError(() => err.error)
      }),
    )
  }
}

// @Injectable()
// export class ApiInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let setHeaders;
//     if (localStorage.getItem("isLoggedIn")) {
//       setHeaders = {
//         Authorization: "Bearer " + localStorage.getItem("x-auth-token"),
//       };
//     } else {
//       setHeaders = {};
//     }
//     let apiReq = request.clone({ url: `${request.url}` });

//     request = request.clone({
//       headers: request.headers.set("Accept", "application/json"),
//     });
//     apiReq = request.clone({ url: `${request.url}`, setHeaders: setHeaders });

//   }
// }
