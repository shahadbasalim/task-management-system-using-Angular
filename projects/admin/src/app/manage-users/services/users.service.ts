import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChangeStatus } from '../context/DTOs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  userData = new BehaviorSubject({});

  getAllUsers(filter: any) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
          params = params.append(key, value);
        }
      });
    }
    return this.http.get(
      environment.baseApi.replace('tasks', 'auth') + '/users',
      { params }
    );
  }

  getUsersData(model?: any) {
    this.getAllUsers(model).subscribe((res: any) => {
      console.log(res);
      this.userData.next({
        data: res.users,
        totalItems: res.totalItems,
        total: res.totalItems,
      });
    });
  }

  deleteUser(id: any) {
    return this.http.delete(
      environment.baseApi.replace('tasks', 'auth') + '/user/' + id
    );
  }

  changeStatus(model: ChangeStatus) {
    return this.http.put(
      environment.baseApi.replace('tasks', 'auth') + '/user-status',
      model
    );
  }
}
