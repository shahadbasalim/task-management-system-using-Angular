import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { UsersComponent } from './pages/user-management/components/users/users.component';
import { AddTaskComponent } from './pages/admin-tasks/components/add-task/add-task.component';
import { ListTasksComponent } from './pages/admin-tasks/components/list-tasks/list-tasks.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { ErrorPageComponent } from './pages/error-page/components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent, // لا يستخدم الـ Navbar
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent, // يستخدم الـ Layout مع الـ Navbar
    canActivateChild: [authGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'list-tasks', component: ListTasksComponent },
    ],
  },
  { path: '**', component: ErrorPageComponent },
];
