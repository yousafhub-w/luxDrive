import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('role');

    if (user === "admin") {
      return true;
    } else {
      this.router.navigate(['/unauthorised']);
      return false; 
    }
  }
}
