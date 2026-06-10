import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { HandleError } from '../../../../core/model/h-error/handle-error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css'],
})
export class UserLogin implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  genericError = ''; // Error genérico que no revela qué campo está mal

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // ─── Getters para acceso limpio en el template ───────────────────────────────

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  // ─── Helpers de estado de campo ──────────────────────────────────────────────

  isFieldInvalid(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  // ─── Mensajes de error de validación local ───────────────────────────────────

  get emailError(): string {
    if (this.email.hasError('required')) return 'El email es obligatorio.';
    if (this.email.hasError('email')) return 'Ingresá un email válido.';
    return '';
  }

  get passwordError(): string {
    if (this.password.hasError('required')) return 'La contraseña es obligatoria.';
    if (this.password.hasError('minlength')) return 'La contraseña debe tener al menos 8 caracteres.';
    return '';
  }

  // ─── Submit ──────────────────────────────────────────────────────────────────

  onSubmit(): void {
    // Doble guarda: si el formulario es inválido no hace nada
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.genericError = ''; // Limpia errores previos

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Guardar token y email en localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userEmail', email);
        this.successMessage = '¡Bienvenido de nuevo!';
        // Redirige a orders luego de 1.5s para que vea el mensaje
        setTimeout(() => this.router.navigate(['/order-create']), 1500);
      },
      error: (err: HandleError) => {
        this.isLoading = false;

        //se cambia de logica tecnica a logica de negocio

        switch (err.code) {
          case 'UNAUTHORIZED':
            this.genericError = 'Credenciales inválidas. Verificá tu email y contraseña.';
            break;
          case 'VALIDATION_ERROR':
            if (err.details?.email) {
              this.genericError = err.details.email;
            } else if (err.details?.password) {
              this.genericError = err.details.password;
            }
            break;
          case 'EMAIL_TAKEN':
            this.genericError = 'El email esta en uso, prueba con otro';
            break;
          case 'UNKNOWN_ERROR':
            this.genericError = 'Ocurrió un error. Intentalo más tarde.';
            break;
        }

      },
    });
  }
}
