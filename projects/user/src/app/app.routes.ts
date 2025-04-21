import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ListTasksComponent } from './tasks/components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './tasks/components/task-details/task-details.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent, // لا يستخدم الـ Navbar
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

    ],
  },
  {
    path: '',
    component: MainLayoutComponent, // يستخدم الـ Layout مع الـ Navbar
    canActivateChild: [authGuard],
    children: [
      { path: '', component: ListTasksComponent },
      { path: 'task-details/:id', component: TaskDetailsComponent },

    ],
  },
  // اغيرها واحط صفحة الخطا
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
