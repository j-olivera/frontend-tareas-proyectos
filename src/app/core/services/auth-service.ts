import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface RegisterPayload {
    email: string;
    password: string;
}

export interface RegisteredUser {
    id: number;
    email: string;
    state: 'PENDING';
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly BASE_URL = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    register(payload: RegisterPayload): Observable<RegisteredUser> {
        return this.http
            .post<RegisteredUser>(`${this.BASE_URL}/api/users`, payload)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        // Re-lanza el error tal cual para que el componente lo maneje
        return throwError(() => error);
    }
}

// el auth-service responde a la pregunta ¿quien sos?