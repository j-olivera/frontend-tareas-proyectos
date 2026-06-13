import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { OrderService, OrderResponse } from './order.service';
import { environment } from '../../../../environments/environment';

describe('Order', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an order', () => {
    const mockOrder: OrderResponse = {
      id: 1,
      userEmail: 'test@test.com',
      amount: 100,
      orderStatus: 'PENDING',
      createdAt: '2022-01-01T00:00:00'
    };

    service.createOrder({ amount: 100 }).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ amount: 100 });
    req.flush(mockOrder);
  });

  it('should handle 422 error', () => {
    service.createOrder({ amount: 100 }).subscribe({
      error: error => {
        expect(error.code).toBe('VALIDATION_ERROR');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders`);
    req.flush({ message: 'User is not active' }, { status: 422, statusText: 'Unprocessable Entity' });
  });

  it('should handle 401 error', () => {
    service.createOrder({ amount: 100 }).subscribe({
      error: error => {
        expect(error.code).toBe('UNAUTHORIZED');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders`);
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should get orders', () => {
    const mockOrders: OrderResponse[] = [
      {
        id: 1,
        userEmail: 'test@test.com',
        amount: 100,
        orderStatus: 'PENDING',
        createdAt: '2022-01-01T00:00:00'
      }
    ];

    service.getOrders().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should modify an order', () => {
    const mockOrder: OrderResponse = {
      id: 1,
      userEmail: 'test@test.com',
      amount: 150,
      orderStatus: 'PENDING',
      createdAt: '2022-01-01T00:00:00'
    };

    service.modifyOrder(1, 150).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ amount: 150 });
    req.flush(mockOrder);
  });

  it('should cancel an order', () => {
    service.cancelOrder(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/orders/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
