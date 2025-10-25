import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  currentUser: any;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Get logged-in user's email from localStorage
    const userEmail = JSON.parse(localStorage.getItem('currentUser')!)?.email;

    if (!userEmail) {
      this.toast.warning('Please login to view your orders');
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Fetch user from db.json by email
    this.http.get<any[]>(`http://localhost:3000/signUpUsers?email=${userEmail}`).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.toast.error('User not found');
          this.router.navigate(['/login']);
          return;
        }

        this.currentUser = res[0];

        // ✅ Load orders
        this.orders = this.currentUser.orders || [];

        // Sort by newest first
        this.orders.sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Failed to load orders');
      }
    });
  }
}
