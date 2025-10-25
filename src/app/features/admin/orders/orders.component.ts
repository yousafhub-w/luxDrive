import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html'
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private adminService: AdminService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ✅ Load all users and flatten their orders
  loadOrders() {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.orders = [];

        users.forEach((user: any) => {
          if (user.orders && user.orders.length > 0) {
            user.orders.forEach((order: any) => {
              this.orders.push({
                ...order,
                userId: user.id,
                userName: user.fullName,
                email: user.email
              });
            });
          }
        });
      },
      error: () => this.toast.error('Failed to load orders')
    });
  }

  // ✅ Change order status (updates in db.json)
  changeStatus(order: any, newStatus: string) {
    if (!newStatus) return;

    // Fetch the specific user from db
    this.adminService.getUserById(order.userId).subscribe({
      next: (user) => {
        const updatedOrders = user.orders.map((o: any) => {
          if (o.id === order.id) {
            return { ...o, status: newStatus };
          }
          return o;
        });

        const updatedUser = { ...user, orders: updatedOrders };

        // ✅ Update user orders back to db
        this.adminService.updateUserOrders(order.userId, updatedUser).subscribe({
          next: () => {
            // ✅ Update local UI instantly
            this.adminService.updateOrderStatus(order.id, newStatus)
              .subscribe(() => {
                order.status = newStatus;
                this.toast.success(`Order ${order.id} status changed to ${newStatus}`);
              });
          },
          error: () => this.toast.error('Failed to update order status')
        });
      },
      error: () => this.toast.error('User not found')
    });
  }
}
