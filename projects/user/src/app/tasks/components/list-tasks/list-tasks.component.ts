import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TasksService } from '../../services/tasks.service';
import { ToastService } from '../../../shared/services/toast.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  imports: [CommonModule, NgxPaginationModule, TranslateModule, RouterModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
})
export class ListTasksComponent implements OnInit {
  dataSource: any = [];
  tasksFilter!: FormGroup;

  page: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0; // سيتم تعيينه بعد جلب البيانات

  userData: any;
  selectedStatus: string = 'In-Progress';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: TasksService,
    private toast: ToastService,

  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getAllTasks();
  }

  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = window.atob(token.split('.')[1]);
    this.userData = JSON.parse(window.atob(token.split('.')[1]));
    console.log(this.userData);
  }

  getAllTasks() {
    let params = {
      page: this.page,
      limit: 10,
      status: this.selectedStatus,
    };
    this.service.getUserTasks(this.userData.userId, params).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res.tasks;
        this.totalItems = res.total;
      },
      (error) => {
        this.dataSource = [];
      }
    );
  }

  complete(ele: any) {
    const model = {
      id: ele._id,
    };
    this.service.completeTask(model).subscribe((res: any) => {
      console.log(res);
      this.getAllTasks();
      this.toast.show('task completed successfully', 'success');
    });
  }
}
