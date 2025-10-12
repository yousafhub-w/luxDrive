import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
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
    private cartService: CartService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    if (!this.currentUser) {
      this.toast.warning('Please login to view your orders');
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders(): void {
    this.cartService.getUserOrders(this.currentUser.id).subscribe({
      next: orders => this.orders = orders,
      error: err => this.toast.error('Failed to fetch orders')
    });
  }
}
