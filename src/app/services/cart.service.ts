import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
    console.log('Cart Items:', this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }
}
