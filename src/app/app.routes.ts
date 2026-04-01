import { Routes } from '@angular/router';
import { UserRegister } from './features/user/register/component/user-register';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: UserRegister }
];

// puse que la ruta por default-home sea la de register ya que todavía no genere el componente home