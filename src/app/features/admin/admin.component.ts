import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartData, ChartDataset } from 'chart.js';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  

  productsCount = 0;
  usersCount = 0;
  ordersCount = 0;

  // Bar Chart
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = { responsive: true };

  public barChartData: ChartData<'bar'> = {
    labels: ['Products', 'Users', 'Orders'],
    datasets: [
      {
        label: 'Count',
        data: [0, 0, 0], // initial values
        backgroundColor: ['#f59e0b', '#10b981', '#3b82f6'],
      },
    ],
  };

  // Donut Chart
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Products', 'Users', 'Orders'],
    datasets: [
      {
        data: [0, 0, 0], // initial values
        backgroundColor: ['#f59e0b', '#10b981', '#3b82f6'],
      },
    ],
  };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getProducts().subscribe((res) => {
      this.productsCount = res.length;
      this.updateCharts();
    });

    this.adminService.getUsers().subscribe((res) => {
      this.usersCount = res.length;
      this.updateCharts();
    });

    this.adminService.getOrders().subscribe((res) => {
      this.ordersCount = res.length;
      this.updateCharts();
    });
  }
 
  updateCharts() {
   
    this.barChartData.datasets[0].data = [
      this.productsCount,
      this.usersCount,
      this.ordersCount,
    ];

    this.doughnutChartData.datasets[0].data = [
      this.productsCount,
      this.usersCount,
      this.ordersCount,
    ];

    
  }

  navigateUsers(){
    this.router.navigate(['admin/users'])
  }

  navigateDashboard(){
    this.router.navigate(['/admin'])
  }

  navigateProducts(){
    this.router.navigate(['/admin/products'])
  }

  navigateOrders(){
    this.router.navigate(['/admin/orders'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
