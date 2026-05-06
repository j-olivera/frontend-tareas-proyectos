import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HandleError } from '../model/h-error/handle-error';

@Injectable({
  providedIn: 'root',
})
export class Order {
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(amount: number): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/orders`, { amount })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let appError: HandleError = { code: 'UNKNOWN_ERROR' };

    if (error.status === 422) {
      appError.code = 'VALIDATION_ERROR';
      appError.details = error.error;
    } else if (error.status === 401) {
      appError.code = 'UNAUTHORIZED';
    } else if (error.status === 500) {
      appError.code = 'SERVER_DOWN';
    }

    return throwError(() => appError);
  }
}
