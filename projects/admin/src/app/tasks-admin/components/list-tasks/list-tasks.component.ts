import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../shared/services/toast.service';

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
  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];

  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];
  constructor(
    private service: TasksService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.spinner.show();
    this.service.getAllTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = this.mappingTasks(res.tasks);
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
        this.toast.show('An error occurred', 'error');
      }
    );
  }

  mappingTasks(data: any[]) {
    let newTasks = data.map((item) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return newTasks;
  }

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
    this.spinner.show();
    this.service.deleteTask(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.toast.show('task deleted successfully', 'success');
        this.getAllTasks();
      },
      (error) => {
        this.spinner.hide();
        this.toast.show('An error occurred', 'error');
      }
    );
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
}
