import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { HandleError } from '../../../core/model/h-error/handle-error';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  router = inject(Router);
  orderForm!: FormGroup;
  userEmail: string = '';

  // Toast state
  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  };

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail') || 'usuario@ejemplo.com'; // lo pongo por las dudas, despues agrego el auth-guard y este componente solo debería poder ser accedido por usuarios autenticados
    this.orderForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  get amountControl() {
    return this.orderForm.get('amount');
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.orderForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toast = { show: true, message, type };
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toast.show = false;
      this.cdr.detectChanges();
    }, 4000);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const amount = this.orderForm.value.amount;
      this.orderService.createOrder({ amount }).subscribe({
        next: () => {
          this.showToast('¡Orden creada con éxito!', 'success');
          this.orderForm.reset();
          setTimeout(() => {
            this.router.navigate(['/order-create']); // se actualiza
          }, 2000);
        },
        error: (error: HandleError) => {
          let msg = 'Ocurrió un error inesperado';
          if (error.code === 'VALIDATION_ERROR') {
            msg = 'El usuario no está activo';
          } else if (error.code === 'UNAUTHORIZED') {
            msg = 'No tenés sesión iniciada';
          }
          this.showToast(msg, 'error');
        }
      });
    }
  }
}
