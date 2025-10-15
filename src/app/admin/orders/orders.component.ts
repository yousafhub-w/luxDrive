

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html'
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  statusOptions = ['processing', 'shipped', 'delivered', 'cancelled'];

  constructor(private adminService: AdminService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }

  changeStatus(order: any, newStatus: string) {
    if (!newStatus) return;

    this.adminService.updateOrderStatus(order.id, newStatus).subscribe(res => {
      order.status = newStatus; // update locally
      this.toast.success(`Order ${order.id} status changed to ${newStatus}`);
    }, err => {
      this.toast.error('Failed to update status.');
    });
  }
}
