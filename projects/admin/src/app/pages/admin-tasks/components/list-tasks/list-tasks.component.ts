import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { ToastService } from '../../../../shared/services/toast.service';
import moment from 'moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../../user-management/services/users.service';

@Component({
  selector: 'app-list-tasks',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatNativeDateModule,
    CommonModule,
    MatDialogModule,
    NgxPaginationModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];

  dataSource: any = [];
  tasksFilter!: FormGroup;

  users: any = [];

  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];

  page: number = 1;
  filteration: any = {
    page: this.page,
    limit: 7,
  };
  totalItems!: number;

  timeOutId: any;

  constructor(
    private service: TasksService,
    public dialog: MatDialog,
    private toast: ToastService,
    private userService: UsersService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllTasks();
  }

  getUsers() {
    this.userService.getUsersData();
  }
  getDataFromSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.users = this.usersMapping(res.data);
    });
  }

  usersMapping(data: any[]) {
    let newUsers = data?.map((item) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newUsers;
  }

  //filter functions
  search(event: any) {
    this.filteration['keyword'] = event.value;
    this.page = 1;
    this.filteration['page'] = 1;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }

  selectUser(event: any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['userId'] = event.value;
    this.getAllTasks();
  }

  selectStatus(event: any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['status'] = event.value;
    this.getAllTasks();
  }

  selectDate(event: any, type: string) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY');
    if (type == 'toDate' && this.filteration['toDate'] !== 'Invalid date') {
      this.getAllTasks();
    }
  }

  getAllTasks() {
    this.service.getAllTasks(this.filteration).subscribe((res: any) => {
      console.log('get all tasks', res);
      // this.dataSource = this.mappingTasks(res.tasks);
      this.dataSource = res.tasks;
      this.totalItems = res.totalItems;
    });
  }

  // mappingTasks(data: any[]) {
  //   let newTasks = data.map((item) => {
  //     return {
  //       ...item,
  //       user: item.userId?.username,
  //     };

  //   });
  //   return newTasks;
  // }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '700px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  }

  deleteTask(id: any) {
    console.log('delete id' , id);
    this.service.deleteTask(id).subscribe((res) => {
      this.toast.show('task deleted successfully', 'success');
      this.getAllTasks();
    });
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '700px',
      height: '500px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  }

  //pagination
  changePage(event: any) {
    this.page = event;
    this.filteration['page'] = event;
    this.getAllTasks();
  }
}
