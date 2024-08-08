import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dashboard'); // Esto no hace falta porque solo tenemos 2 paginas (login y dashboard) pero si hubiera mas si seria necesario asi que es mejor dejarlo
    return false;
  }
  return true;
};
