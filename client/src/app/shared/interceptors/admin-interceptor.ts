import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '@app/pages/auth/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('get-users')) {
      const authToken = `Bearer ${this.authSvc.userTokenValue}`;
      const authReq = req.clone({
        setHeaders: {
          authorization: authToken,
        },
      });
      console.log(req);
      console.log(authReq);
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
