import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(model: Login) {
    return this.http.post(
      environment.baseApi.replace('tasks', 'auth') + '/login',
      model
    );
  }
}
