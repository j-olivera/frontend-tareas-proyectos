import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, OrderResponse } from '../../../core/services/order/order.service';
import { interval, Observable, of } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HandleError } from '../../../core/model/h-error/handle-error';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../../../shared/components/logout/logout.component';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoutComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);

  orders$: Observable<OrderResponse[]> = of([]);
  error: string | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.orders$ = interval(30000).pipe(
      startWith(0),
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
}
