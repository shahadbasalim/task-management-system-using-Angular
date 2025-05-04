import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // استرجاع بيانات المستخدم من التوكن
  getUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = window.atob(token.split('.')[1]);
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

  getUserId() {
    const userData = this.getUserData();
    return userData ? userData.userId : null;
  }
}
