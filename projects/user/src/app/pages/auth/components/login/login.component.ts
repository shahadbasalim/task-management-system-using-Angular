import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../models/DTOs';
// import { LoginResponse } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const model: Login = {
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password'],
      role: 'user',
    };
    this.service.login(model).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.toast.show('Login successful', 'success');
      this.router.navigate(['/list-tasks']);
    });
  }
}
