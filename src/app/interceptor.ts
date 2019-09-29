
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of, from } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators'
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.startsWith(environment.urlServer + 'api/login')) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.authService.getXsrf().XSRFTOKEN
                }
            });
            return next.handle(request);
        }
        return next.handle(request);
    }
}


