import { Routes } from '@angular/router';
import { UserRegister } from './features/user/register/component/user-register';
import { UserLogin } from './features/user/login/component/user-login';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: UserRegister },
    { path: 'login', component: UserLogin }
];

// puse que la ruta por default-home sea la de register ya que todavía no genere el componente home
