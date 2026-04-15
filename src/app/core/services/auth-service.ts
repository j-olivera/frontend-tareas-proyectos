import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface RegisterPayload { // datos cargados por el usuario
    email: string;
    password: string;
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
            .post<RegisteredUser>(`${this.BASE_URL}/api/users`, payload) // envia los datos al backend
            .pipe(catchError(this.handleError)); // maneja los errores
    }       //.pipe() intercepta la informacion que sale del "tubo"

    private handleError(error: HttpErrorResponse): Observable<never> {
        //se cambiara esto en la sig feature
        return throwError(() => error);
    }
}

// el auth-service responde a la pregunta ¿quien sos?
// tambien nos sirve para respetar el Single Responsibility Principle (SRP) y en caso de agrandar el proyecto, la reutilazcion de codigo
