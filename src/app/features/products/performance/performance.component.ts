import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-interior',
  templateUrl: './performance.component.html'
})
export class PerformanceComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  currentUser: any;

  constructor(
    private toast: ToastrService,
    private taskService: TaskService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (this.currentUser) {
      this.loadUserProducts();
    } else {
      this.loadGuestProducts();
    }
  }

  // Load products for logged-in user (filter by Interior category)
  private loadUserProducts(): void {
    this.wishlistService.getWishlist(this.currentUser.id).subscribe(wishlist => {
      this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
        this.taskService.getProducts().subscribe(data => {
          const interiorProducts = data.filter(p => p.category === "Performance Utility");
          this.products = interiorProducts.map(p => ({
            ...p,
            wishlist: wishlist.some((w: any) => w.id === p.id),
            isAdded: cart.some((c: any) => c.id === p.id)
          }));
          this.filteredProducts = [...this.products];

          this.cartService.setCartCount(cart.length);
          this.wishlistService.setWishCount(wishlist.length);
        });
      });
    });
  }

  // Load products for guest user (Interior category only)
  private loadGuestProducts(): void {
    this.taskService.getProducts().subscribe(data => {
      const interiorProducts = data.filter(p => p.category === "Interior Accessories");
      this.products = interiorProducts.map(p => ({
        ...p,
        wishlist: false,
        isAdded: false
      }));
      this.filteredProducts = [...this.products];
    });
  }

  // Receive filtered search results from Navbar
  updateFilteredProducts(results: any[]): void {
    this.filteredProducts = results.length ? results.filter(p => p.category === "Interior Accessories") : [...this.products];
  }

  // Add product to cart
  addToCart(product: any): void {
    if (!this.currentUser) {
      this.toast.warning('Please log in to add items to cart');
      return;
    }

    this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) existing.quantity += 1;
      else cart.push({ ...product, quantity: 1 });

      this.cartService.addToCart(this.currentUser.id, cart).subscribe(() => {
        product.isAdded = true;
        this.cartService.setCartCount(cart.length);
        this.toast.success(`${product.name} added to cart`);
      });
    });
  }

  // Toggle wishlist
  toggleWishlist(product: any): void {
    if (!this.currentUser) {
      this.toast.warning('Please log in to manage wishlist');
      return;
    }

    product.wishlist = !product.wishlist;

    this.wishlistService.getWishlist(this.currentUser.id).subscribe(wishlist => {
      let updatedWishlist: any[] = [];

      if (product.wishlist) {
        updatedWishlist = [...wishlist, product];
        this.toast.success(`${product.name} added to wishlist`);
      } else {
        updatedWishlist = wishlist.filter((p: any) => p.id !== product.id);
        this.toast.info(`${product.name} removed from wishlist`);
      }

      this.wishlistService.updateWishlist(this.currentUser.id, updatedWishlist).subscribe(() => {
        this.wishlistService.setWishCount(updatedWishlist.length);
      });
    });
  }

  // Navigate to cart page
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
