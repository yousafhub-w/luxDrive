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

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get logged in user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    // Initialize form
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

    // Update validators dynamically based on payment method
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

  /** Confirm order */
  confirmOrder(): void {
    if (!this.currentUser) {
      this.toast.warning('Please login to place order');
      this.router.navigate(['/login']);
      return;
    }

    if (this.checkoutForm.invalid) {
      this.toast.error('Please fill all required fields correctly');
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const orderData = {
      userId: this.currentUser.id,
      ...this.checkoutForm.value,
      cart: [] // you can push current cart items here
    };

    // For demo: just showing success
    this.toast.success('Order placed successfully!');
    console.log('Order Data:', orderData);

    // Reset form & navigate
    this.checkoutForm.reset();
    this.router.navigate(['/']);
  }
}

