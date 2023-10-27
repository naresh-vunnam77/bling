import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router)
  const token = authService.token;

  if (token) {
    return true;
  } else {
    return router.createUrlTree(['auth/signin'], {
      queryParams: { loggedOut: true, origUrl: state.url },
    });
  }
};
