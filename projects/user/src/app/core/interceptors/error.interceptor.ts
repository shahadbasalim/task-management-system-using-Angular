import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../shared/services/toast.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toast.show(error.error.message, 'error', 'Error');
      if (
        error.error.message == 'jwt expired' ||
        error.error.message == 'jwt malformed'
      ) {
        router.navigate(['/login']);
        localStorage.removeItem('token');
      }

      throw error;
    })
  );
};
