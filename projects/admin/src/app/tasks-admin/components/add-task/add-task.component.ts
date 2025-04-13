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
import { ToastService } from '../../../shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  users: any = [
    { name: 'Moahmmed', id: '67f69b0be2be3fc238ba6b6e' },
    { name: 'Ali', id: '67f69befe2be3fc238ba6b73' },
  ];
  ngOnInit(): void {
    this.createForm();
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
    this.spinner.show();
    let model = this.prepereFormData();
    this.service.createTask(model).subscribe(
      (res) => {
        this.dialog.close(true);
        this.spinner.hide();
        this.toast.show('task created successfully', 'success');
      },
      (error) => {
        this.spinner.hide();
        this.toast.show('An error occurred', 'error');
      }
    );
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
    this.spinner.show();
    let model = this.prepereFormData();
    this.service.updateTask(this.data._id, model).subscribe(
      (res) => {
        this.dialog.close(true);
        this.spinner.hide();
        this.toast.show('task updated successfully', 'success');
      },
      (error) => {
        this.spinner.hide();
        this.toast.show('An error occurred', 'error');
      }
    );
  }

  close() {
    let hasChanges = false;
    Object.keys(this.newTaskForm.controls).forEach((item) => {
      if (this.formValues[item] !== this.newTaskForm.value[item]) {
        hasChanges = true;
      }
    });
    if (hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
