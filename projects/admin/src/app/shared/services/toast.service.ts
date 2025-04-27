import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    title: string = '',
  ) {
    this.toastr[type](message, title , {
      closeButton: true,
      progressBar: true,
      easing: 'ease-down',
      timeOut: 4000,
       toastClass: 'ngx-toastr'
    });
  }
}
