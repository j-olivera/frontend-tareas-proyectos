import { Routes } from '@angular/router';
import { UserRegister } from './features/user/register/component/user-register';
import { UserLogin } from './features/user/login/component/user-login';
import { OrderCreateComponent } from './features/order/create/order-create.component';
import { OrderViewComponent } from './features/order/view/order-view.component';
import { authGuard } from './core/services/auth/auth.guard';
import { HomeComponent } from './core/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: UserRegister },
    { path: 'login', component: UserLogin },
    { path: 'order-create', component: OrderCreateComponent, canActivate: [authGuard] },
    { path: 'order-view', component: OrderViewComponent, canActivate: [authGuard] }
];

// Se ha establecido 'home' como la ruta predeterminada de la aplicación.
