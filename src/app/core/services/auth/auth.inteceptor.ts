import {HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth-service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const isLoggedIn = authService.isLoggedIn();
    if (isLoggedIn) {
        const clone = req.clone({
            setHeaders: {
                Authorization: `Bearer ${isLoggedIn}`
            }
        });
        return next(clone).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
    return next(req);
}