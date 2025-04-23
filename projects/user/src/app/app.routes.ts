import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { ListTasksComponent } from './pages/tasks/components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './pages/tasks/components/task-details/task-details.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { ErrorPageComponent } from '../../../admin/src/app/pages/error-page/components/error-page/error-page.component';

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
      { path: 'list-tasks', component: ListTasksComponent },
      { path: 'task-details/:id', component: TaskDetailsComponent },
    ],
  },

  {
    path: '**',
    component: ErrorPageComponent,
  },
];
