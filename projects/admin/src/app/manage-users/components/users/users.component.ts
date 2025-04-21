import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../services/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../shared/services/toast.service';
import { ChangeStatus } from '../../context/DTOs';

@Component({
  selector: 'app-users',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    NgxPaginationModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  dataSource: any = [];

  page: number = 1;
  limit: number = 7;
  totalItems!: number;

  timeOutId: any;

  constructor(
    private service: UsersService,
    private translate: TranslateService,
    private toast: ToastService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const model = {
      page: this.page,
      limit: this.limit,
      name: ''
    }
    this.service.getUsersData(model)
  }

  getDataFromSubject() {
    this.service.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems = res.total;
    });
  }

  deleteUser(id: string, index: number) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toast.show(
        'User Cannot be Deleted as he has assigned tasks',
        'error'
      );
    } else {
      this.service.deleteUser(id).subscribe((res: any) => {
        this.getUsers();
        this.toast.show('User Deleted Successfully', 'success');
      });
    }
  }

  changeUserStatus(status: string, id: string, index: number) {
    const model: ChangeStatus = {
      id,
      status,
    };

    if (this.dataSource[index].assignedTasks > 0) {
      this.toast.show(
        'User Cannot be Deactivated as he has assigned tasks',
        'error'
      );
    } else {
      this.service.changeStatus(model).subscribe((res: any) => {
        this.getUsers();
        this.toast.show('User Status Changed Successfully', 'success');
      });
    }
  }

  //pagination
  changePage(event: any) {
    this.page = event;
    this.getUsers();
  }
}
