import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ChangeStatus } from '../../models/DTOs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { fadeInDownOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    TableComponent,
    MatDialogModule,
    ConfirmDialogComponent,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInDownOnEnterAnimation()],

})
export class UsersComponent implements OnInit {
  CONDITION: boolean = true;

  tableColumns = [
    { def: 'position', header: '#', type: 'index' },
    { def: 'name', header: 'tasks.name', type: 'text', field: 'username' },
    { def: 'email', header: 'general.email', type: 'text', field: 'email' },
    {
      def: 'tasksAssigned',
      header: 'tasks.tasksAssigned',
      type: 'text',
      field: 'assignedTasks',
    },
    {
      def: 'actions',
      header: 'tasks.actions',
      isAction: true,
      actions: [
        {
          type: 'delete',
          icon: 'delete',
          class: 'delete-icon',
          showIf: () => true,
        },
        {
          type: 'changeStatus',
          label: 'general.active',
          class: 'icon-green',
          showIf: (element: any) => element.status !== 'Active',
        },
        {
          type: 'changeStatus',
          label: 'general.in-active',
          class: 'gray-btn',
          showIf: (element: any) => element.status === 'Active',
        },
      ],
    },
  ];

  dataSource: any = [];

  page: number = 1;
  limit: number = 7;
  totalItems!: number;
  filteration: any = {
    page: this.page,
    limit: this.limit,
  };

  timeOutId: any;

  constructor(
    private service: UsersService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getDataFromSubject();
  }

  getUsers() {
    this.service.getUsersData(this.filteration);
  }

  getDataFromSubject() {
    this.service.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems = res.totalItems;
    });
  }

  onTableAction(event: any) {
    const user = event.data;
    const index = this.dataSource.indexOf(event.data);

    if (event.type === 'delete') {
      this.deleteUser(user._id, index);
    } else if (event.type === 'changeStatus') {
      this.changeUserStatus(user.status, user._id, index);
    }
  }

  deleteUser(id: string, index: number) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toast.show(
        'User Cannot be Deleted as he has assigned tasks',
        'error'
      );
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'general.confirm-delete-message',
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteUser(id).subscribe((res: any) => {
          this.getUsers();
          this.toast.show('User Deleted Successfully', 'success');
        });
      }
    });
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

  changePage(event: any) {
    this.page = event;
    this.filteration['page'] = event;
    this.getUsers();
  }

  search(event: any) {
    this.filteration['name'] = event.value;
    this.page = 1;
    this.filteration['page'] = 1;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getUsers();
    }, 2000);
  }
}
