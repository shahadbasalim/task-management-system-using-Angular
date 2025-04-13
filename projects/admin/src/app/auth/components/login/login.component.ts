import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginResponse } from '../../context/DTOs';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      role: ['admin'],
    });
  }

  login() {
    this.spinner.show();
    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/list-tasks']);
        this.spinner.hide();
        this.toast.show('Login successful', 'success');
      },
      (error) => {
        console.error(error);
        this.toast.show('Login failed', 'error');
        this.spinner.hide();
      }
    );
  }
}
