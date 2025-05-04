import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TasksService } from '../tasks/services/tasks.service';
import { AuthService } from '../auth/services/auth.service';
import { fadeInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
    CommonModule,
    TranslateModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter()],
  animations: [fadeInRightOnEnterAnimation()],


})
export class DashboardComponent implements OnInit {
  CONDITION: boolean = true;


  userData: any;

  currentTime: any;

  tasks: any[] = [];
  totalInProgressTasks: number = 0;
  totalItems: number = 0;

  constructor(private tasksService: TasksService,  private authService: AuthService) {}
  ngOnInit() {
    setInterval(() => {
      this.updateTime();
    }, 1000); // تحديث الوقت كل ثانية

    this.userData = this.authService.getUserData(); // الحصول على بيانات المستخدم من الخدمة المشتركة
    this.getAllTasks();
  }

  getAllTasks() {
    const params = {
      page: 1,
      limit: 1000,
      status: 'In-Progress',
    };
    this.tasksService.getUserTasks(this.userData.userId, params).subscribe(
      (res: any) => {
        console.log(res);
        this.totalItems = res.tasks.length;
        this.totalInProgressTasks = res.tasks.filter((task: any) => task.status === 'In-Progress').length;
      }
    );
  }

  // get time
  updateTime(): void {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString();
  }
}
