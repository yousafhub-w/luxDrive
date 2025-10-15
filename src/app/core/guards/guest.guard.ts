import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private toast:ToastrService) {}

  canActivate(): boolean {

    
    const user = localStorage.getItem('currentUser');
    const admin = localStorage.getItem('role')

      

    if ( user ) {
       this.router.navigate(['/']);
       return false
    } else if (admin === "admin"){
      this.router.navigate(['/admin'])
      return false
    } else {
      return true
    }
  }
}

