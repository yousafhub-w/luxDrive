import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  totalQuantity: number = 0;
  currentUser: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser) {
      this.loadCart();
    } 
  }

  loadCart(): void {
    this.cartService.getUserCart(this.currentUser.id).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotals();
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  increaseQty(item: any): void {
    item.quantity++;
    this.updateCart();
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
    else {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    }
    this.updateCart();
  }

  removeItem(item: any): void {
    if (confirm('Remove this item from cart?')) {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      this.updateCart();
    }
  }

  updateCart(): void {
    this.cartService.updateCart(this.currentUser.id, this.cartItems).subscribe({
      next: () => {
        this.calculateTotals();
        this.cartService.setCartCount(this.cartItems.length);
      },
      error: (err) => console.error('Error updating cart:', err)
    });
  }

  calculateTotals(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    this.totalQuantity = this.cartItems.reduce(
      (sum, item) => sum + item.quantity, 0
    );
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Order placed successfully!');
    // this.cartItems = [];
     this.router.navigate(['/checkout']);
  }


}
