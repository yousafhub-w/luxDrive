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

    if(!this.currentUser){
      this.toast.warning(`Please Login`);
      setTimeout(()=>{
        this.router.navigate(['/login']);
      })
      
    }

    if (this.currentUser) {
      this.loadWishlist();
      this.cartService.cartUpdated$.subscribe(() => {
      this.syncWithCart();
      });
    }
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist(this.currentUser.id).subscribe((wishlist: any[]) => {
      this.products = wishlist.map(p => ({ ...p, wishlist: true }));
      this.wishlistService.setWishCount(this.products.length);
    });
  }

  toggleWishlist(product: any): void {
    product.wishlist = !product.wishlist;

    let updatedWishlist = [...this.products];
    if (!product.wishlist) {
      updatedWishlist = updatedWishlist.filter(p => p.id !== product.id);
      this.toast.info(`${product.name} removed from wishlist`);
    } else {
      updatedWishlist.push(product);
      this.toast.success(`${product.name} added to wishlist`);
    }
    this.products = updatedWishlist;
    this.wishlistService.updateWishlist(this.currentUser.id, updatedWishlist).subscribe(() => {
      this.wishlistService.setWishCount(updatedWishlist.length);
    });
  }

 addToCart(product: any): void {
  if (!this.currentUser) {
    this.toast.warning('Please login to add to cart');
    return;
  }

    this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
    let updatedCart = Array.isArray(cart) ? [...cart] : [];
    const exists = updatedCart.find((p: any) => p.id === product.id);

    if (!exists) {
      updatedCart.push({ ...product, quantity: 1 });

        this.cartService.addToCart(this.currentUser.id, updatedCart).subscribe(() => {
        this.toast.success(`${product.name} added to cart`);
        product.isAdded = true;
        this.cartService.setCartCount(updatedCart.length);
      });
    }else{
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

  enable(): void {
    this.router.navigate(['/cart']);
  }
}
