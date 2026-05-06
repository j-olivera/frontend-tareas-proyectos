import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order as OrderService } from '../../../core/services/order.service';
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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.orderForm.valid) {
      const amount = this.orderForm.value.amount;
      this.orderService.createOrder(amount).subscribe({
        next: () => {
          this.successMessage = 'Order successfully created';
          this.errorMessage = '';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/order']); // actualizado, fuera de lo planteado en la spec
          }, 2000);
        },
        error: (error: HandleError) => {
          this.successMessage = '';
          if (error.code === 'VALIDATION_ERROR') {
            this.errorMessage = 'User is not active';
          } else if (error.code === 'UNAUTHORIZED') {
            this.errorMessage = 'User is not logged in';
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
}
