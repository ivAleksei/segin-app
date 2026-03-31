import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const permission = route.data?.['permission'] as string;
    if (!permission) return true;

    const raw = sessionStorage.getItem('_permissions');
    if (!raw) {
      this.router.navigate(['/internal/home']);
      return false;
    }

    try {
      const permissions = JSON.parse(raw) as Record<string, number>;
      if (permissions[permission] !== 1) {
        this.router.navigate(['/internal/home']);
        return false;
      }
    } catch {
      this.router.navigate(['/internal/home']);
      return false;
    }

    return true;
  }
}
