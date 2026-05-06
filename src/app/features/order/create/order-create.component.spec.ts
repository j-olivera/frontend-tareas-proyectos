import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Order as OrderService } from '../../../core/services/order.service';
import { By } from '@angular/platform-browser';
import { OrderCreateComponent } from './order-create.component';

describe('OrderCreateComponent', () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;
  let orderService: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCreateComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when amount is empty', () => {
    component.orderForm.controls['amount'].setValue('');
    fixture.detectChanges();
    expect(component.orderForm.invalid).toBe(true);
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBe(true);
  });

  it('should show red border on blur when amount is invalid (Scenario 2)', () => {
    const input = fixture.debugElement.query(By.css('#amount')).nativeElement;
    input.value = '-10';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.orderForm.controls['amount'].invalid).toBe(true);
    const field = fixture.debugElement.query(By.css('.field')).nativeElement;
    expect(field.classList).toContain('field--error');
    const errorMsg = fixture.debugElement.query(By.css('.field__error')).nativeElement;
    expect(errorMsg.textContent).toContain('El monto debe ser mayor a 0');
  });

  it('should call service and show success message on valid submit (Scenario 1)', () => {
    component.orderForm.controls['amount'].setValue(453.23);
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({ id: 1 });

    // Check component property directly to avoid Change Detection issues in test
    expect(component.successMessage).toBe('Order successfully created');
  });

  it('should show "User is not active" on 422 error (Scenario 3)', () => {
    component.orderForm.controls['amount'].setValue(100);
    fixture.detectChanges();

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    req.flush({ message: 'User is not active' }, { status: 422, statusText: 'Unprocessable Entity' });

    expect(component.errorMessage).toBe('User is not active');
  });
});
