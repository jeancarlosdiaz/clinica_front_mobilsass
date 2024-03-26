import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
        pathMatch:'full'
    },
    {
        path:'pages',
        loadChildren: () =>
        import('./pages/layout/layout.routes').then((m) => m.routes),
        canActivate:[loginGuard]
    }
];
