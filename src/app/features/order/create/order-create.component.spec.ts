import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OrderCreateComponent } from './order-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from '../../../core/services/order/order.service';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('OrderCreateComponent', () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;
  let orderService: OrderService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('test@example.com'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      },
      writable: true
    });

    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true
    });

    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [OrderCreateComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderService,
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user email from localStorage', () => {
    const emailSpan = fixture.debugElement.query(By.css('.btn-user span')).nativeElement;
    expect(emailSpan.textContent).toBe('test@example.com');
  });

  it('should show success toast on valid submit', async () => {
    component.orderForm.controls['amount'].setValue(100);
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({ id: 1 });

    fixture.detectChanges();

    expect(component.toast.show).toBe(true);
    expect(component.toast.type).toBe('success');
    expect(component.toast.message).toBe('¡Orden creada con éxito!');

    const toastElement = fixture.debugElement.query(By.css('.toast-container')).nativeElement;
    expect(toastElement).toBeTruthy();
    expect(toastElement.textContent).toContain('¡Orden creada con éxito!');

    // Advance timers for navigation check
    vi.advanceTimersByTime(2000);
    expect(router.navigate).toHaveBeenCalledWith(['/order-create']);

    // Advance timers to hide toast
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    expect(component.toast.show).toBe(false);
  });

  it('should show error toast on 422 error', async () => {
    component.orderForm.controls['amount'].setValue(100);
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({ message: 'User is not active' }, { status: 422, statusText: 'Unprocessable Entity' });

    fixture.detectChanges();

    expect(component.toast.show).toBe(true);
    expect(component.toast.type).toBe('error');
    expect(component.toast.message).toBe('El usuario no está activo');

    const toastElement = fixture.debugElement.query(By.css('.toast-container')).nativeElement;
    expect(toastElement.classList).toContain('toast--error');
  });

  it('should have a link to view orders', () => {
    const link = fixture.debugElement.query(By.css('.link-orders'));
    expect(link).toBeTruthy();
    expect(link.attributes['routerLink']).toBe('/view-orders');
    expect(link.nativeElement.textContent).toContain('Ver tus ordenes');
  });
});
