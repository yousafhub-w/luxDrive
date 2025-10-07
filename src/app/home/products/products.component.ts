// import { Component, inject, OnInit } from '@angular/core';
// import { TaskService } from 'src/app/services/task.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html'
// })
// export class ProductsComponent implements OnInit{

//   products:any[] = [];

//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.taskService.getProducts().subscribe(data  => {
//       this.products = data;
//     })
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { CartService } from 'src/app/services/cart.service'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(
    private taskService: TaskService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.taskService.getProducts().subscribe(data => {
      this.products = data.map(product => ({ ...product, wishlist: false }));
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: any) {
    product.wishlist = !product.wishlist;
  }
}

