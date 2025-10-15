

import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private adminService: AdminService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  toggleStatus(user: any) {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    this.adminService.updateUserStatus(user.id, newStatus).subscribe(res => {
      user.status = newStatus; // update local array
      this.toast.success(`User ${user.fullName} is now ${newStatus}`);
    }, err => {
      this.toast.error('Something went wrong!');
    });
  }
}
