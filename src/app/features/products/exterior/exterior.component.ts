import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-exterior',
  templateUrl: './exterior.component.html'
})
export class ExteriorComponent {
products:any;
currentUser :any;


 constructor(private toast:ToastrService, private taskService:TaskService, private cartService:CartService ){}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.taskService.getProducts().subscribe(data => {
      const filtered = data.filter(p => p.category === "Exterior Accessories")

      this.products = filtered.map(p => ({ ...p, wishlist: false }));
    });
  }

addToCart(product: any) {
    if (!this.currentUser) {
      alert('Please log in to add items to your cart.');
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
        next: () => this.toast.success(`${product.name} added to your cart!`),
        error: err => console.error('Error updating cart:', err)
      });
    });
  }

  toggleWishlist(data:any){

  }
   
}