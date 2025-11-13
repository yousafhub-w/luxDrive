import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:3000/signUpUsers';

  constructor(private http: HttpClient) {}

  getWishlist(userId: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map((user: any) => user.wishList || [])
    );
  }

  updateWishlist(userId: string, wishlist: any[]): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, { wishList: wishlist });
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  private wishCountSubject = new BehaviorSubject<number>(0);
  wishCount$ = this.wishCountSubject.asObservable();

  setWishCount(count: number): void {
    this.wishCountSubject.next(count);
  }

  resetWishCount(): void {
    this.wishCountSubject.next(0);
  }
}
