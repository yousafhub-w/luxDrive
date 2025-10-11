import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:3000/signUpUsers'; // JSON Server users endpoint

  constructor(private http: HttpClient) {}

  /**
   * ✅ Get only the wishlist array for a specific user
   */
  getWishlist(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map((user: any) => user.wishList || [])
    );
  }

  /**
   * ✅ Update (replace) the user's wishlist array
   */
  updateWishlist(userId: string, wishlist: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { wishList: wishlist });
  }

  /**
   * ✅ Optional: Get full user data (if you need other info)
   */
  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  /**
   * ✅ Live wishlist count tracking using BehaviorSubject
   */
  private wishCountSubject = new BehaviorSubject<number>(0);
  wishCount$ = this.wishCountSubject.asObservable();

  /**
   * ✅ Set new wishlist count (update subscribers like navbar)
   */
  setWishCount(count: number): void {
    this.wishCountSubject.next(count);
  }

  /**
   * ✅ Reset wishlist count to 0 (e.g., on logout)
   */
  resetWishCount(): void {
    this.wishCountSubject.next(0);
  }
}
