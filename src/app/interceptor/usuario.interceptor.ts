import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if ( !authService.isAuthenticated() ) {
    return next(req);
  }

  const token = authService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
