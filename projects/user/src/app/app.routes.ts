import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ListTasksComponent } from './tasks/components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './tasks/components/task-details/task-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'list-tasks', component: ListTasksComponent},
  { path: 'task-details', component: TaskDetailsComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
