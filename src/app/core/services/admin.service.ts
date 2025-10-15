import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000'; // your json-server URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/signUpUsers`);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }
  updateUserStatus(userId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/signUpUsers/${userId}`, { status });
  }



 

  // Add product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  // Delete product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }


  // Update order status
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}`, { status });
  }

  // Optional: get single user orders if needed
  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders?userId=${userId}`);
  }
}
