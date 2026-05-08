import { Routes } from '@angular/router';
import { UserRegister } from './features/user/register/component/user-register';
import { UserLogin } from './features/user/login/component/user-login';
import { OrderCreateComponent } from './features/order/create/order-create.component';
import { OrderViewComponent } from './features/order/view/order-view.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: UserRegister },
    { path: 'login', component: UserLogin },
    { path: 'order-create', component: OrderCreateComponent },
    { path: 'order-view', component: OrderViewComponent }
];

// puse que la ruta por default-home sea la de register ya que todavía no genere el componente home
