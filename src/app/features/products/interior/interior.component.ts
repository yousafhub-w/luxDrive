import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html'
})
export class InteriorComponent {
  products: any;
  currentUser: any;

  constructor(
    private toast: ToastrService,
    private taskService: TaskService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load current user if logged in
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    // Fetch all products in Interior category
    this.taskService.getProducts().subscribe(data => {
      const filtered = data.filter(p => p.category === "Interior Accessories");

      if (this.currentUser) {
        // If user is logged in, mark products already in cart
        this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
          this.products = filtered.map(p => ({
            ...p,
            wishlist: false,
            isAdded: cart.some((item: any) => item.id === p.id)
          }));

          // Update cart count
          this.cartService.setCartCount(cart.length);
        });
      } else {
        // User not logged in → just show products, all buttons "Add to Cart" will show but won't work
        this.products = filtered.map(p => ({
          ...p,
          wishlist: false,
          isAdded: false
        }));
      }
    });
  }

  addToCart(product: any) {
    if (!this.currentUser) {
      this.toast.warning(`Please login!`)
      return;
    }

    this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
      const existing = cart.find((item: any) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      this.cartService.addToCart(this.currentUser.id, cart).subscribe({
        next: () => {
          this.toast.success(`${product.name} added to your cart!`);
          product.isAdded = true;
          this.cartService.setCartCount(cart.length);
        },
        error: err => console.error('Error updating cart:', err)
      });
    });
  }

  enable() {
    this.router.navigate(['/cart']);
  }

  toggleWishlist(product: any) {
    product.wishlist = !product.wishlist;
  }
}
