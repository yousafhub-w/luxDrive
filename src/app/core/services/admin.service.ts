import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000'; // your json-server URL

  constructor(private http: HttpClient) {}

  // ---------- USERS ----------
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/signUpUsers`);
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/signUpUsers/${userId}`, { status });
  }

  // ---------- PRODUCTS ----------
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // Update an existing product
updateProduct(product: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/products/${product.id}`, product);
}


  // ---------- ORDERS ----------
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    // Dummy update method used by admin for triggering local update
    return new Observable(observer => {
      observer.next({ orderId, status });
      observer.complete();
    });
  }

  // ---------- USER ORDERS ----------
  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders?userId=${userId}`);
  }

  // ---------- ADDITIONS (NEW METHODS) ----------
  // ✅ Get single user by ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/signUpUsers/${userId}`);
  }

  // ✅ Update entire user (used to update orders array in db.json)
  updateUserOrders(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/signUpUsers/${userId}`, updatedUser);
  }
}
