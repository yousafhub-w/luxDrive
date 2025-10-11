import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { TaskService } from 'src/app/core/services/task.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  currentUser: any;

  constructor(
    private taskService: TaskService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  if (this.currentUser) {
    // Logged in: fetch cart & wishlist
    this.wishlistService.getWishlist(this.currentUser.id).subscribe(wishlist => {

      this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
        this.taskService.getProducts().subscribe(data => {
          this.products = data.map(p => ({
            ...p,
            wishlist: wishlist.some((w: any) => w.id === p.id),
            isAdded: cart.some((c: any) => c.id === p.id)
          }));

          this.cartService.setCartCount(cart.length);
          this.wishlistService.setWishCount(wishlist.length);
        });
      });
    });
  } else {
    // Not logged in: show products only
    this.taskService.getProducts().subscribe(data => {
      this.products = data.map(p => ({
        ...p,
        wishlist: false,
        isAdded: false
      }));
    });
  }
}


  addToCart(product: any): void {
    if (!this.currentUser) {
      this.toast.warning('Please log in to add items to cart');
      return;
    }

    this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
      const updatedCart = [...cart];
      const existing = updatedCart.find((i: any) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      this.cartService.addToCart(this.currentUser.id, updatedCart).subscribe(() => {
        product.isAdded = true;
        this.cartService.setCartCount(updatedCart.length);
        this.toast.success(`${product.name} added to cart`);
      });
    });
  }

  toggleWishlist(product: any): void {
    if (!this.currentUser) {
      this.toast.warning('Please log in to manage wishlist');
      return;
    }

    product.wishlist = !product.wishlist;

    this.wishlistService.getWishlist(this.currentUser.id).subscribe(wishlist => {
  let updatedWishlist = [...wishlist];
        

      if (product.wishlist) {
        wishlist.push(product);
        this.toast.success(`${product.name} added to wishlist`);
      } else {
        wishlist = wishlist.filter((p: any) => p.id !== product.id);
        this.toast.info(`${product.name} removed from wishlist`);
      }

      this.wishlistService.updateWishlist(this.currentUser.id, wishlist).subscribe(() => {
        this.wishlistService.setWishCount(wishlist.length); // ✅ update live count
      });
    });
  }

  enable(): void {
    this.router.navigate(['/cart']);
  }
}
