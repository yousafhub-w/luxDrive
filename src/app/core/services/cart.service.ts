import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:3000/signUpUsers';

  // ✅ Explicitly define the BehaviorSubject type
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  cartUpdated$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  /** ✅ Set new cart count value */
  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  resetCartCount() {
    this.cartCountSubject.next(0);
  }

  /** Get user's cart */
  getUserCart(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user.cart || [])
    );
  }

  /** Add or update user's cart */
  addToCart(userId: string, updatedCart: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { cart: updatedCart }).pipe(
      tap(() => this.cartUpdated$.next())
    );
  }

  /** Remove or update product from cart */
  updateCart(userId: string, updatedCart: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { cart: updatedCart }).pipe(
      tap(() => this.cartUpdated$.next())
    );
  }

  /** ------------------ Orders functionality ------------------ */

  /** Get user's orders */
  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user.orders || [])
    );
  }

  /** Add new order and clear cart */
  addOrder(userId: string, orderData: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      switchMap(user => {
        const currentOrders = user.orders || [];
        const newOrders = [...currentOrders, orderData];

        // Patch orders and empty cart
        return this.http.patch(`${this.baseUrl}/${userId}`, { 
          orders: newOrders,
          cart: [] 
        }).pipe(
          tap(() => this.cartUpdated$.next())
        );
      })
    );
  }
}
