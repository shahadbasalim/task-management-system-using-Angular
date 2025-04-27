import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { UsersService } from '../user-management/services/users.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../admin-tasks/services/tasks.service';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';

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
})
export class DashboardComponent {
  usersDataSource: any[] = [];
  totalUsers: number = 0;
  employeeOfTheMonth: any;

  tasksDataSource: any[] = [];
  completedTasks: any[] = [];
  unCompletedTasks: any[] = [];

  barChartData: any;

  currentTime: any;

  cardsData = [
    { icon: 'groups', value: this.totalUsers, label: 'موظفين' },
    { icon: 'done_all', value: this.completedTasks.length, label: 'مهام مكتملة' },
    { icon: 'timeline', value: this.unCompletedTasks.length, label: 'مهام قيد التنفيذ' }
  ];

  stars = Array(5);
  constructor(
    private taskService: TasksService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.getUsers();
    this.getDataFromSubject();

    setInterval(() => {
      this.updateTime();
    }, 1000); // تحديث الوقت كل ثانية
  }

  // get all tasks
  getAllTasks() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      console.log('get tasks', res);
      this.tasksDataSource = res.tasks;
      this.completedTasks = this.tasksDataSource.filter(
        (task: any) => task.status === 'Complete'
      );
      this.unCompletedTasks = this.tasksDataSource.filter(
        (task: any) => task.status === 'In-Progress'
      );
    });
  }

  // get users and assigned tasks
  getUsers() {
    this.userService.getUsersData();
  }

  getDataFromSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.totalUsers = res.totalItems;

      this.usersDataSource = res.data || [];

      this.barChartData = {
        labels: this.usersDataSource.map((item: any) => item.username),
        datasets: [
          {
            label: 'عدد المهام المسندة لكل موظف',
            data: this.usersDataSource.map((item: any) => item.assignedTasks),
            // bar chart style
            backgroundColor: 'rgba(0, 49, 139, 0.3)',
            borderColor: 'rgba(0, 49, 139, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0, 49, 139, 0.5)',
            hoverBorderWidth: 2,
          },
        ],
      };

      if (this.usersDataSource.length) {
        this.employeeOfTheMonth = this.usersDataSource.reduce(
          (prev: any, current: any) => {
            return current.assignedTasks > prev.assignedTasks ? current : prev;
          }
        );
      }
    });
  }

  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: '#333' },
        grid: { color: '#eee' },
        border: { color: '#333'},
      },
      y: {
        ticks: { color: '#333' },
        grid: { color: '#eee' },
        border: { color: '#333'},
      },
    },
  };

  // get time
  updateTime(): void {
    const date = new Date();
    this.currentTime = date.toLocaleTimeString();
  }
}
