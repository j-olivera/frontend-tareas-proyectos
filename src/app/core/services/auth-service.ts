import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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

    private handleError(error: HttpErrorResponse): Observable<never> {
        // Re-lanza el error tal cual para que el componente lo maneje
        return throwError(() => error);
    }
}

// el auth-service responde a la pregunta ¿quien sos?
// tambien nos sirve para respetar el Single Responsibility Principle (SRP) y en caso de agrandar el proyecto, la reutilazcion de codigo

/*

@Injectable({
    providedIn: 'root', // es una instancia global, sirve para no perder la informacion, no se duplique ni se reinicie
})
    esto sirve para que los demas componentes a la hora de manejar las credenciales correspodientes no tengan que crear una instancia de AuthService, sino
    que se dirijan aca y la reutilicen
    Sin eso se generaría una instancia de authservice por componente, lo cual seria un desperdicio de memoria y recursos
*/