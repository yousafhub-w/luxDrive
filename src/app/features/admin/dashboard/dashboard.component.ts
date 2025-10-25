import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartData, ChartDataset } from 'chart.js';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {


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
    // Update Bar Chart
    this.barChartData.datasets[0].data = [
      this.productsCount,
      this.usersCount,
      this.ordersCount,
    ];

    // Update Donut Chart
    this.doughnutChartData.datasets[0].data = [
      this.productsCount,
      this.usersCount,
      this.ordersCount,
    ];
  }
  
}
