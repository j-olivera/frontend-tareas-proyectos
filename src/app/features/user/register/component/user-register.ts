import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { HandleError } from '../../../../core/model/h-error/handle-error';

@Component({
  selector: 'app-register',
  standalone: true, // Standalone -> true indica que el COMPONENTE ES 100% INDEPENDIENTE
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css'],
})
export class UserRegister implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  serverErrors: { email?: string; password?: string } = {};

  constructor(
    private fb: FormBuilder, // sirve para armar formularios complejos con menos codigo
    private authService: AuthService, // delega la comunicación con el backend
    private router: Router // sirve para cambiar de pantalla sin recargar la pagina web
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
  // funciones para ver que tipo de error hay en el formulario
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
    if (this.registerForm.invalid) return; //Si un usuario malicioso quita el atributo disabled del botón desde el navegador, esta línea evita que se envíe basura al servidor.

    this.isLoading = true; // para no hacer doble click en el boton y q muestre el spinner de carga
    this.successMessage = '';
    this.serverErrors = {};

    const { email, password } = this.registerForm.value;

    this.authService.register({ email, password }).subscribe({ // suscribre sirve para no congelar la pantalla
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Cuenta creada. Iniciá sesión.';
        // Redirige a login para obtener el JWT (el backend no devuelve token en register)
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err: HandleError) => {
        this.isLoading = false;

        switch (err.code) {
          case 'EMAIL_TAKEN':
            this.serverErrors.email = 'El email ya está registrado.';
            this.email.markAsTouched();
            break;
          case 'VALIDATION_ERROR':
            if (err.details?.email) {
              this.serverErrors.email = err.details.email;
            } else if (err.details?.password) {
              this.serverErrors.password = err.details.password;
            }
            this.email.markAsTouched();
            this.password.markAsTouched();
            break;
        }
      },
    });
  }
}
