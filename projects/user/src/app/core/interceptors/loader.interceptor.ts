import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
// Counter for active HTTP requests
let counter = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Increment counter when a request starts
  counter++;
  // Show spinner only for the first request
  if (counter === 1) {
    spinner.show();
  }
  return next(req).pipe(
    finalize(() => {
      // Decrement counter when the request completes
      counter--;

      // Hide spinner when all requests are done
      if (counter === 0) {
        spinner.hide();
      }
    })
  );
};
