import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/signUpUsers`);
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/signUpUsers/${userId}`, { status });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(product: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/products/${product.id}`, product);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return new Observable(observer => {
      observer.next({ orderId, status });
      observer.complete();
    });
  }

  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders?userId=${userId}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/signUpUsers/${userId}`);
  }

  updateUserOrders(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/signUpUsers/${userId}`, updatedUser);
  }
}
