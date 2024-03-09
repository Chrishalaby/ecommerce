import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@Environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // public constructor(private readonly accessTokenService: AccessTokenService) {}

  // public intercept(
  //   request: HttpRequest<typeof HttpHeaders>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<unknown>> {
  //   // const accessToken: string = this.accessTokenService.getAccessToken();
  //   const isApiRequest: boolean = request.url.includes(environment.apiUrl);
  //   const isAuthRequest: boolean = request.url.includes(ModuleRoutes.Auth);

  //   // if (!isApiRequest || isAuthRequest || !accessToken) {
  //   return next.handle(request);
  //   // }

  //   // const authReq: HttpRequest<typeof HttpHeaders> = request.clone({
  //   //   headers: request.headers.set(HttpHeaders.Authorization, `Bearer ${accessToken}`),
  //   // });

  //   // return next.handle(authReq);
  // }

  public intercept(
    request: HttpRequest<any>, // Changed typeof HttpHeaders to any for generalization
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request is for local assets
    const isLocalAsset: boolean = request.url.startsWith('./assets/');

    // Determine if the request URL already includes the API URL
    const isApiRequest: boolean =
      !request.url.startsWith(environment.apiUrl) && !isLocalAsset;

    // Prepare new request URL if it's an API request
    if (isApiRequest) {
      const apiReq = request.clone({
        url: environment.apiUrl + request.url, // Prepend the environment API URL
      });
      return next.handle(apiReq);
    }

    // For non-API requests or if the URL already includes the API URL, forward them as is
    return next.handle(request);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
