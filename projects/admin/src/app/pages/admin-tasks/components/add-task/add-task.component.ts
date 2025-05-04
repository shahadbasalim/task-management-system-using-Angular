import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import moment from 'moment';
import { ToastService } from '../../../../shared/services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '../../../user-management/services/users.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-task',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',

})
export class AddTaskComponent implements OnInit {

  newTaskForm!: FormGroup;
  fileName: string = '';
  formValues: any; // save the values that user enter in the form

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private service: TasksService,
    private toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService
  ) {
    this.getDataFromSubject();
  }

  users: any = [];
  ngOnInit(): void {
    this.createForm();
  }

  getDataFromSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.users = this.usersMapping(res.data);
    });
  }

  usersMapping(data: any[]) {
    let newUsers = data.map((item) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newUsers;
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data
          ? new Date(
              this.data?.deadline.split('-').reverse().join('-')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });
    this.formValues = this.newTaskForm.value;
  }

  selectImage(event: any) {
    this.fileName = event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  createTask() {
    let model = this.prepereFormData();
    this.service.createTask(model).subscribe((res) => {
      this.dialog.close(true);
      this.toast.show('task created successfully', 'success');
    });
  }

  prepereFormData() {
    let newDate = moment(this.newTaskForm.value['deadline']).format(
      'DD-MM-YYYY'
    );
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }

  updateTask() {
    let model = this.prepereFormData();
    this.service.updateTask(this.data._id, model).subscribe((res) => {
      this.dialog.close(true);
      this.toast.show('task updated successfully', 'success');
    });
  }

  close() {
    let hasChanges = false;
    Object.keys(this.newTaskForm.controls).forEach((item) => {
      if (this.formValues[item] !== this.newTaskForm.value[item]) {
        hasChanges = true;
      }
    });
    if (hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        data: {
          message: 'general.discard-change',
        },
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.dialog.close();
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
