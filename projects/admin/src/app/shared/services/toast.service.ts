import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) {
    this.toastr[type](message);
  }
}
