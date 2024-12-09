import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debugging: Check if this log runs

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      console.log('Cloned request with headers:', clonedReq); // Debugging: Check the request
      return next.handle(clonedReq);
    }

    console.log('No token found, passing request as is'); // Debugging: Log if no token
    return next.handle(req);
  }
}
