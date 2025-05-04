import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getAllTasks(filter?: any) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
          params = params.append(key, value);
        }
      });
    }
    return this.http.get(environment.baseApi + '/all-tasks', { params });
  }
  createTask(model: any) {
    return this.http.post(environment.baseApi + '/add-task', model);
  }
  deleteTask(id: any) {
    return this.http.delete(environment.baseApi + '/delete-task/' + id);
  }
  updateTask(id: any, model: any) {
    return this.http.put(environment.baseApi + '/edit-task/' + id, model);
  }
}
