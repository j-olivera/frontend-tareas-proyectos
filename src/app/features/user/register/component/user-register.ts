import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css'],
})
export class UserRegister implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  serverErrors: { email?: string; password?: string } = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ─── Getters para acceso limpio en el template ───────────────────────────────

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  // ─── Helpers de estado de campo ──────────────────────────────────────────────

  isFieldInvalid(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  // ─── Mensajes de error de validación local ───────────────────────────────────

  get emailError(): string {
    if (this.serverErrors.email) return this.serverErrors.email;
    if (this.email.hasError('required')) return 'El email es obligatorio.';
    if (this.email.hasError('email')) return 'Ingresá un email válido.';
    return '';
  }

  get passwordError(): string {
    if (this.serverErrors.password) return this.serverErrors.password;
    if (this.password.hasError('required')) return 'La contraseña es obligatoria.';
    if (this.password.hasError('minlength')) return 'La contraseña debe tener al menos 6 caracteres.';
    return '';
  }

  // ─── Limpiar errores del servidor al escribir de nuevo ───────────────────────

  clearServerError(field: 'email' | 'password'): void {
    this.serverErrors[field] = undefined;
  }

  // ─── Submit ──────────────────────────────────────────────────────────────────

  onSubmit(): void {
    // Doble guarda: si el formulario es inválido no hace nada (el botón debería estar deshabilitado)
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.successMessage = '';
    this.serverErrors = {};

    const { email, password } = this.registerForm.value;

    this.authService.register({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Cuenta creada exitosamente.';
        // Redirige a la pantalla de órdenes luego de 1.5 s para que el usuario vea el mensaje
        setTimeout(() => this.router.navigate(['/orders']), 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        if (err.status === 409) {
          // El email ya existe en el sistema
          this.serverErrors.email = 'El email ya está registrado.';
          this.email.markAsTouched();
        } else if (err.status === 400) {
          // Errores de validación que devuelve el backend
          const body = err.error;
          if (body?.email) this.serverErrors.email = body.email;
          if (body?.password) this.serverErrors.password = body.password;
          this.email.markAsTouched();
          this.password.markAsTouched();
        }
      },
    });
  }
}