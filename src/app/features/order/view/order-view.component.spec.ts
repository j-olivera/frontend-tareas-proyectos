import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderViewComponent } from './order-view.component';
import { OrderService, OrderResponse } from '../../../core/services/order/order.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('OrderViewComponent', () => {
  let component: OrderViewComponent;
  let fixture: ComponentFixture<OrderViewComponent>;
  let orderService: any;

  const mockOrders: OrderResponse[] = [
    {
      id: 1,
      userEmail: 'test@test.com',
      amount: 100,
      orderStatus: 'PENDING',
      createdAt: '2022-01-01T00:00:00'
    }
  ];

  beforeEach(async () => {
    orderService = {
      getOrders: vi.fn().mockReturnValue(of(mockOrders)),
      modifyOrder: vi.fn().mockReturnValue(of(mockOrders[0])),
      cancelOrder: vi.fn().mockReturnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [OrderViewComponent, ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: OrderService, useValue: orderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    expect(orderService.getOrders).toHaveBeenCalled();
    component.orders$.subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });
  });

  it('should open edit modal with order data', () => {
    component.onEdit(mockOrders[0]);
    expect(component.showEditModal).toBe(true);
    expect(component.selectedOrder).toEqual(mockOrders[0]);
    expect(component.editForm.value.amount).toBe(100);
  });

  it('should call modifyOrder and refresh on confirmEdit', () => {
    component.onEdit(mockOrders[0]);
    component.editForm.patchValue({ amount: 150 });
    
    const refreshSpy = vi.spyOn(component.refresh$, 'next');
    
    component.confirmEdit();
    
    expect(orderService.modifyOrder).toHaveBeenCalledWith(1, 150);
    expect(component.showEditModal).toBe(false);
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should open cancel modal', () => {
    component.onCancel(mockOrders[0]);
    expect(component.showCancelModal).toBe(true);
    expect(component.orderToCancelId).toBe(1);
  });

  it('should call cancelOrder and refresh on confirmCancel', () => {
    component.onCancel(mockOrders[0]);
    
    const refreshSpy = vi.spyOn(component.refresh$, 'next');
    
    component.confirmCancel();
    
    expect(orderService.cancelOrder).toHaveBeenCalledWith(1);
    expect(component.showCancelModal).toBe(false);
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should close modals on closeModals', () => {
    component.showEditModal = true;
    component.showCancelModal = true;
    component.closeModals();
    expect(component.showEditModal).toBe(false);
    expect(component.showCancelModal).toBe(false);
  });
});
