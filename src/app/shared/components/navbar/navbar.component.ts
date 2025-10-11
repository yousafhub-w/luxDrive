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
  profileDropDown:boolean = false;
  isLoggedIn: boolean = false;
  currentUser: any;
  cartCount: number = 0;
  wishlistCount: number = 0;
  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(
    private eRef: ElementRef,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private taskService: TaskService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadCartCount();
    this.loadWishlistCount();
    // ✅ Reactively update when products are added/removed
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
    this.wishlistService.wishCount$.subscribe(count => this.wishlistCount = count);

    this.taskService.getProducts().subscribe(data => {
    this.products = data;
    this.filteredProducts = [...this.products]; // initially show all
  });
  }

  checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    this.isLoggedIn = !!user;
  }

  onSearch(value: string) {
  const searchTerm = value.toLowerCase();
  this.filteredProducts = this.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm)
  );
}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.toast.success('User logged out');
     this.cartService.resetCartCount();
    this.router.navigate(['/login']);
  }

  cartButton() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser) {
      this.router.navigate(['/cart']);
    } else {
      alert('User not logged in');
      this.router.navigate(['/login']);
    }
  }

  loadCartCount() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser) {
      this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
        const count = cart.length; // number of distinct products
        this.cartCount = count;
        this.cartService.setCartCount(count);
      });
    }
  }

  wishlist(){
    if (this.currentUser) {
      this.router.navigate(['/wishlist']);
    } else {
      alert('User not logged in');
      this.router.navigate(['/login']);
    }
  }

  loadWishlistCount(){
    if(this.currentUser){
      this.wishlistService.getWishlist(this.currentUser.id).subscribe(wish => {
        const count = wish.length;
        this.wishlistCount = count;
        this.wishlistService.setWishCount(count);
      })
    }else {
    this.wishlistCount = 0;
    this.wishlistService.resetWishCount();
  }
  }

  toggleDropdown() {
    this.dropDown = !this.dropDown;
  }

  toggleProfile(){
    this.profileDropDown = !this.dropDown;
  }

  // ------ Close dropdown when clicking outside ------
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropDown = false;
      this.profileDropDown = false;
    }
  }
}
