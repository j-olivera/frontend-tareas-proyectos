import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HandleError } from '../../model/h-error/handle-error';

export interface RegisterPayload { // datos cargados por el usuario
    email: string;
    password: string;
}

export interface LoginPayload { // datos para login
    email: string;
    password: string;
}

export interface LoginResponse { // respuesta del backend en login
    token: string;
    type: string;
}

// son contratos que definen la forma que deben tener los datos que entran y salen

export interface RegisteredUser { // datos devueltos por el sistema, id, email, estado y fecha de expiracion (+ 7 dias desde la fecha de creación)
    id: number;
    email: string;
    state: 'PENDING';
    expirationDate: Date;
}

@Injectable({
    providedIn: 'root', // es una instancia global, sirve para no perder la informacion, no se duplique ni se reinicie
})


export class AuthService {
    private readonly BASE_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }
    //                recibe                       retorna
    register(payload: RegisterPayload): Observable<RegisteredUser> { // un Observable es un "tubo" por donde viaja la informacion
        return this.http // hace la peticion http
            .post<RegisteredUser>(`${this.BASE_URL}/users`, payload) // envia los datos al backend
            .pipe(catchError(this.handleError)); // maneja los errores
    }       //.pipe() intercepta la informacion que sale del "tubo"

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.BASE_URL}/login`, payload)
            .pipe(catchError(this.handleError));
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    logout(): void {
        localStorage.clear();
        window.location.href = '/login';
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let appError: HandleError = { code: 'UNKNOWN_ERROR' };

        if (error.status == 409) {
            appError.code = 'EMAIL_TAKEN';

        } else if (error.status == 400) {
            appError.code = 'VALIDATION_ERROR';
            appError.details = error.error;
        } else if (error.status == 500) {
            appError.code = 'SERVER_DOWN';

        } else if (error.status == 401) {
            appError.code = 'UNAUTHORIZED';

        } else if (error.status == 404) {
            appError.code = 'NOT_FOUND'; // no se usa en el proyecto

        } else {
            appError.code = 'UNKNOWN_ERROR';
        }

        return throwError(() => appError);
    }
}

// el auth-service responde a la pregunta ¿quien sos?
// tambien nos sirve para respetar el Single Responsibility Principle (SRP) y en caso de agrandar el proyecto, la reutilazcion de codigo
