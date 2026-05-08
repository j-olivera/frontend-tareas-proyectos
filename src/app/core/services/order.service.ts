import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HandleError } from '../model/h-error/handle-error';

export interface OrderRequest {
  amount: number;
}

export interface OrderResponse {
  id: number;
  userEmail: string;
  amount: number;
  orderStatus: 'PENDING' | 'PROCESSING' | 'APPROVED' | 'CANCELLED';
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(payload: OrderRequest): Observable<OrderResponse> {
    return this.http
      .post<OrderResponse>(`${this.BASE_URL}/orders`, payload)
      .pipe(catchError(this.handleError));
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http
      .get<OrderResponse[]>(`${this.BASE_URL}/orders`)
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
