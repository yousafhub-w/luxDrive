import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  dropDown: boolean = false;
  profileDropDown: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: any;
  cartCount: number = 0;
  wishlistCount: number = 0;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private taskService: TaskService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!)
    : null;
    this.isLoggedIn = !!this.currentUser;
    this.loadCartCount();
    this.loadWishlistCount();
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
    this.wishlistService.wishCount$.subscribe(count => this.wishlistCount = count);
    this.taskService.getProducts().subscribe(data => {
    this.products = data;
    this.filteredProducts = [...this.products];
    });
  }

  toggleDropdown() { this.dropDown = !this.dropDown; }
  toggleProfile() { this.profileDropDown = !this.profileDropDown; }

  searchProducts(event: Event): void {
  const input = event.target as HTMLInputElement | null;
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  this.filteredProducts = this.products.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  }

  cartButton() {
    if (this.currentUser) this.router.navigate(['/cart']);
    else this.toast.warning('Please log in to view cart');
  }

  wishlist() {
    if (this.currentUser) this.router.navigate(['/wishlist']);
    else this.toast.warning('Please log in to view wishlist');
  }

  loadCartCount() {
    if (this.currentUser) {
      this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
        this.cartCount = cart.length;
        this.cartService.setCartCount(cart.length);
      });
    }
  }

  loadWishlistCount() {
    if (this.currentUser) {
      this.wishlistService.getWishlist(this.currentUser.id).subscribe(wish => {
        this.wishlistCount = wish.length;
        this.wishlistService.setWishCount(this.wishlistCount);
      });
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.cartService.resetCartCount();
    this.wishlistService.resetWishCount();
    this.toast.success('Logged out successfully');
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropDown = false;
      this.profileDropDown = false;
    }
  }
}