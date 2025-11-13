import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:3000/signUpUsers';

  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  cartUpdated$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  resetCartCount() {
    this.cartCountSubject.next(0);
  }

  getUserCart(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user.cart || [])
    );
  }

  addToCart(userId: string, updatedCart: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { cart: updatedCart }).pipe(
      tap(() => this.cartUpdated$.next())
    );
  }

  updateCart(userId: string, updatedCart: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { cart: updatedCart }).pipe(
      tap(() => this.cartUpdated$.next())
    );
  }

  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user.orders || [])
    );
  }

  addOrder(userId: string, orderData: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      switchMap(user => {
        const currentOrders = user.orders || [];
        const newOrders = [...currentOrders, orderData];

      
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
