import {HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = localStorage.getItem('authToken');

    if (token && token !== 'undefined' && token !== 'null') {
        const clone = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token.trim()}`
            }
        });
        return next(clone).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    // Si el servidor nos rechaza, mejor limpiar y pedir login de nuevo
                    authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
    return next(req);
}