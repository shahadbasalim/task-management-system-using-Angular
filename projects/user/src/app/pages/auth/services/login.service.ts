import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount, Login } from '../models/DTOs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  register(model: CreateAccount) {
    return this.http.post(
      environment.baseApi.replace('tasks', 'auth') + '/createAccount',
      model
    );
  }

  login(model: Login) {
    return this.http.post(
      environment.baseApi.replace('tasks', 'auth') + '/login',
      model
    );
  }
}
