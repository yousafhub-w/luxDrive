import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  currentUser: any;
  cartItems: any[] = [];

   orderPlaced = false; 
  formTouched = true;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    if (!this.currentUser) {
      this.toast.warning('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }

    // Load cart items
    this.cartService.getUserCart(this.currentUser.id).subscribe(cart => {
      this.cartItems = cart;
    });

    // Initialize checkout form
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      landmark: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      paymentMethod: ['', Validators.required],
      upiId: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });

    // Dynamic validators for payment method
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const upi = this.checkoutForm.get('upiId');
      const cardNumber = this.checkoutForm.get('cardNumber');
      const expiry = this.checkoutForm.get('expiry');
      const cvv = this.checkoutForm.get('cvv');

      if (method === 'UPI') {
        upi?.setValidators([Validators.required]);
        cardNumber?.clearValidators();
        expiry?.clearValidators();
        cvv?.clearValidators();
      } else if (method === 'Cards') {
        upi?.clearValidators();
        cardNumber?.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)]);
        expiry?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        cvv?.setValidators([Validators.required, Validators.pattern(/^[0-9]{3}$/)]);
      } else {
        // Cash on Delivery
        upi?.clearValidators();
        cardNumber?.clearValidators();
        expiry?.clearValidators();
        cvv?.clearValidators();
      }

      upi?.updateValueAndValidity();
      cardNumber?.updateValueAndValidity();
      expiry?.updateValueAndValidity();
      cvv?.updateValueAndValidity();
    });
  }

  confirmOrder(): void {
    if (this.checkoutForm.invalid) {
      this.toast.error('Please fill all required fields correctly');
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (!this.cartItems.length) {
      this.toast.warning('Your cart is empty');
      return;
    }

    const orderData = {
      id:  Date.now().toString(),
      items: this.cartItems,
      status: 'Processing',
      orderDetails: this.checkoutForm.value,
      orderedAt: new Date()
    };

    this.cartService.addOrder(this.currentUser.id, orderData).subscribe({
      next: () => {
        this.toast.success('Order placed successfully!');
        this.router.navigate(['/orders']);
      },
      error: () => {
        this.toast.error('Something went wrong while placing the order');
      }
    });
  }

}
