import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      this.router.navigate(['/users']); // Redirect to users page if already logged in
      return false;
    } else {
      return true; // Allow access if not logged in
    }
  }

}
