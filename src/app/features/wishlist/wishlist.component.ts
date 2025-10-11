import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  products: any[] = [];
  currentUser: any;
  wishlistitems: any;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser) {
      this.loadWishlist();
      this.cartService.cartUpdated$.subscribe(() => {
      this.syncWithCart();
});
    }
  }

  /** ✅ Load wishlist items */
  loadWishlist(): void {
    this.wishlistService.getWishlist(this.currentUser.id).subscribe((wishlist: any[]) => {
      this.products = wishlist.map(p => ({ ...p, wishlist: true }));
     



      this.wishlistService.setWishCount(this.products.length);
    });
  }

  /** ✅ Toggle wishlist item */
  toggleWishlist(product: any): void {
    product.wishlist = !product.wishlist;

    let updatedWishlist = [...this.products];

    if (!product.wishlist) {
      // remove
      updatedWishlist = updatedWishlist.filter(p => p.id !== product.id);
      this.toast.info(`${product.name} removed from wishlist`);
    } else {
      // add (in case re-added)
      updatedWishlist.push(product);
      this.toast.success(`${product.name} added to wishlist`);
    }

    this.products = updatedWishlist;
    this.wishlistService.updateWishlist(this.currentUser.id, updatedWishlist).subscribe(() => {
      this.wishlistService.setWishCount(updatedWishlist.length);
    });
  }

  /** ✅ Add wishlist item to cart */
 addToCart(product: any): void {
  if (!this.currentUser) {
    this.toast.warning('Please login to add to cart');
    return;
  }

  // ✅ Get current user's cart (this returns the cart array)
  this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
    let updatedCart = Array.isArray(cart) ? [...cart] : [];

    // ✅ Check if product already exists
    const exists = updatedCart.find((p: any) => p.id === product.id);

    if (!exists) {
      // ✅ Add new product
      updatedCart.push({ ...product, quantity: 1 });

      // ✅ Update backend cart
      this.cartService.addToCart(this.currentUser.id, updatedCart).subscribe(() => {
        this.toast.success(`${product.name} added to cart`);
        product.isAdded = true;

        // ✅ Live cart count update
        this.cartService.setCartCount(updatedCart.length);
        
        

        
      });
    } else {
      this.toast.info(`${product.name} already in cart`);
    }
  });
}

syncWithCart(): void {
  this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
    this.products.forEach((p: any) => {
      p.isAdded = cart.some((c: any) => c.id === p.id);
    });
  });
}



  /** ✅ Navigate to cart page */
  enable(): void {
    this.router.navigate(['/cart']);
  }
}
