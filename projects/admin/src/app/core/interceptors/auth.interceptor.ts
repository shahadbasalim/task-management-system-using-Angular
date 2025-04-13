import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const newReq = request.clone({
    headers: request.headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    ),
  });
  return next(newReq);
};
