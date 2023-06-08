import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export function canAdminActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn() && !authService.isAdmin()) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
}
