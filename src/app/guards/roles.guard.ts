import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../servicios/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const expectedRole: string[] = route.data["expectedRole"];
  const realRole = authService.getRol();
  if (!authService.isAuthenticated() || !expectedRole.some(r => realRole.includes(r))) {
    inject(Router).navigate([""]);
    return false;
  }
  return true;
};
