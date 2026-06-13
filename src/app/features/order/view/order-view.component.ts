import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, OrderResponse } from '../../../core/services/order/order.service';
import { interval, Observable, of, BehaviorSubject, merge } from 'rxjs';
import { catchError, startWith, switchMap, tap, shareReplay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HandleError } from '../../../core/model/h-error/handle-error';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogoutComponent } from '../../../shared/components/logout/logout.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LogoutComponent, ConfirmationModalComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  orders$: Observable<OrderResponse[]> = of([]);
  refresh$ = new BehaviorSubject<void>(undefined);
  error: string | null = null;
  isLoading = true;

  // Modals state
  editForm: FormGroup;
  selectedOrder: OrderResponse | null = null;
  orderToCancelId: number | null = null;
  showEditModal = false;
  showCancelModal = false;
  isSubmitting = false;
  modalError: string | null = null;

  constructor() {
    this.editForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.orders$ = merge(
      interval(30000).pipe(startWith(0)),
      this.refresh$
    ).pipe(
      switchMap(() => this.orderService.getOrders()),
      tap(() => {
        this.isLoading = false;
        this.error = null;
      }),
      catchError((err: HandleError) => {
        this.isLoading = false;
        this.error = this.mapErrorMessage(err.code);
        return of([]);
      }),
      shareReplay(1),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  private mapErrorMessage(code: string): string {
    switch (code) {
      case 'UNAUTHORIZED':
        return 'Debes estar logueado para ver tus órdenes.';
      case 'VALIDATION_ERROR':
        return 'Tu cuenta no está activa. Contacta al soporte.';
      default:
        return 'Ocurrió un error al cargar las órdenes. Reintentando...';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-pending';
      case 'PROCESSING': return 'badge-processing';
      case 'APPROVED': return 'badge-approved';
      case 'CANCELLED': return 'badge-cancelled';
      default: return 'badge-default';
    }
  }

  onEdit(order: OrderResponse): void {
    this.selectedOrder = order;
    this.editForm.patchValue({ amount: order.amount });
    this.showEditModal = true;
    this.modalError = null;
  }

  onCancel(order: OrderResponse): void {
    this.orderToCancelId = order.id;
    this.showCancelModal = true;
  }

  confirmEdit(): void {
    if (this.editForm.invalid || !this.selectedOrder) return;

    this.isSubmitting = true;
    this.modalError = null;
    const newAmount = this.editForm.value.amount;

    this.orderService.modifyOrder(this.selectedOrder.id, newAmount).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModals();
        this.refresh$.next();
      },
      error: (err: HandleError) => {
        this.isSubmitting = false;
        this.modalError = 'Error al modificar la orden. Por favor intenta de nuevo.';
      }
    });
  }

  confirmCancel(): void {
    if (!this.orderToCancelId) return;

    this.isSubmitting = true;
    this.orderService.cancelOrder(this.orderToCancelId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeModals();
        this.refresh$.next();
      },
      error: () => {
        this.isSubmitting = false;
        // En una app real mostraríamos un toast o similar
        this.modalError = 'Error al cancelar la orden. Por favor intenta de nuevo.';
        this.closeModals();
      }
    });
  }

  closeModals(): void {
    this.showEditModal = false;
    this.showCancelModal = false;
    this.selectedOrder = null;
    this.orderToCancelId = null;
    this.modalError = null;
  }
}
