import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'

@Injectable()
export class VerifyTokenResolver implements Resolve<any> {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Observable<never> {
    const token = route.queryParams.token
    let http$: Observable<any>;
    switch(route.data.type) {
      case "admin":
        http$ = this.authService.verifyToken(token);
        break;
      case "user":
        http$ = this.authService.verifyUserToken(token);
        break;
      default:
        http$ = this.authService.verifyToken(token);
    }
    return new Observable((observer) => {
      return http$.subscribe({
        next: ((res: any) => {
          observer.next({ ...res.response, token: token })
          observer.complete()
        }).bind(this),
        error: ((err: any) => {
          this.toastrService.error(err.message)
          this.router.navigate(['forgot-password'])
          observer.complete()
        }).bind(this),
      })
    })
  }
}
