import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TasksService } from '../../services/tasks.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [ TranslateModule, CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  taskId: any;
  taskDetails : any;

  constructor(
    private route: ActivatedRoute,
    private service: TasksService,
    private toast: ToastService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((res : any) => {
      console.log(res);
      this.taskId = res.params.id;
    });
  }

  ngOnInit(): void {
    this.getTaskDetails();
  }

  getTaskDetails() {
    this.service.taskDetails( this.taskId).subscribe((res: any) => {
      console.log("result", res);
      this.taskDetails = res.tasks;
    });
  }

  complete() {
    const model = {
      id: this.taskId,
    };
    this.service.completeTask(model).subscribe((res: any) => {
      console.log(res);
      this.toast.show('task completed successfully', 'success');
      this.router.navigate(['/list-tasks']);
    });
  }
}
