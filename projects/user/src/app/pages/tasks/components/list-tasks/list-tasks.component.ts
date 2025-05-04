import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { TasksService } from '../../services/tasks.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../auth/services/auth.service';
import { fadeInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-list-tasks',
  imports: [
    CommonModule,
    NgxPaginationModule,
    TranslateModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
  animations: [fadeInRightOnEnterAnimation()],

})
export class ListTasksComponent implements OnInit {
  CONDITION: boolean = true;

  dataSource: any = [];
  tasksFilter!: FormGroup;

  page: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0; // سيتم تعيينه بعد جلب البيانات

  userData: any;
  status: any[] = [{ name: 'tasks.Complete' }, { name: 'tasks.In-Progress' }];

  selectedStatus: string = 'tasks.In-Progress'; // القيمة الافتراضية

  constructor(
    private service: TasksService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData(); // الحصول على بيانات المستخدم من الخدمة المشتركة
    this.getAllTasks();
  }


  getAllTasks() {
    let params = {
      page: this.page,
      limit: 10,
      status: this.selectedStatus.split('.')[1],
    };
    this.service.getUserTasks(this.userData.userId, params).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res.tasks ;
        this.totalItems = res.tasks.length;

      },
      (error) => {
        this.dataSource = [];
        this.totalItems = 0;
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

  selectStatus(event: any) {
    this.selectedStatus = event.value;
    this.getAllTasks();
  }
}
