import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthServices} from "./auth-services.service";
import {Router} from "@angular/router";

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private authServices: AuthServices, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticated = this.authServices.isAuthorization()

    if (isAuthenticated) {
      request = this.addToken(request, this.authServices.getToken())
    }

    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res && res.error && res.status === 401) {
          this.authServices.deleteToken()
          this.router.navigate(['login'])
        }
        return throwError(()=>new Error('token invalid'))
      })
    );
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      }
    )
  }
}
