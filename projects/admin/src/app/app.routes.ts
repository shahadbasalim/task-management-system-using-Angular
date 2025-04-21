import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { UsersComponent } from './manage-users/components/users/users.component';
import { AddTaskComponent } from './tasks-admin/components/add-task/add-task.component';
import { ListTasksComponent } from './tasks-admin/components/list-tasks/list-tasks.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';

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
  // اغيرها واحط صفحة الخطا
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
