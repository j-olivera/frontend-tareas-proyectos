import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Order } from './order.service';
import { of } from 'rxjs';

describe('Order', () => {
  let service: Order;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Order,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Order);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an order', () => {
    const mockOrder = { id: 1, amount: 100, status: 'PENDING' };
    
    service.createOrder(100).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ amount: 100 });
    req.flush(mockOrder);
  });

  it('should handle 422 error', () => {
    service.createOrder(100).subscribe({
      error: error => {
        expect(error.code).toBe('VALIDATION_ERROR');
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({ message: 'User is not active' }, { status: 422, statusText: 'Unprocessable Entity' });
  });

  it('should handle 401 error', () => {
    service.createOrder(100).subscribe({
      error: error => {
        expect(error.code).toBe('UNAUTHORIZED');
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
