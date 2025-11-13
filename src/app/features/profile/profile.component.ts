import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  apiUrl = 'http://localhost:3000/signUpUsers';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    if (!currentUser) {
      this.toast.warning('Please log in to view your profile');
      return;
    }

    this.http.get(`${this.apiUrl}/${currentUser.id}`).subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: () => {
        this.toast.error('Failed to load user profile');
      }
    });
  }
}