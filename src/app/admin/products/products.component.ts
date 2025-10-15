import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-adminProducts',
  templateUrl: './products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      alt: ['', Validators.required],
      category: ['', Validators.required],
      carbrand: ['', Validators.required]
    });
  }

  loadProducts() {
    this.adminService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  generateId(): string {
    // Generate unique ID using timestamp
    return Date.now().toString();
  }

  addProduct() {
    if (this.productForm.invalid) return;

    const newProduct = {
      id: this.generateId(),
      ...this.productForm.value
    };

    this.adminService.addProduct(newProduct).subscribe(res => {
      this.products.push(res);
      this.toast.success('Product added successfully!');
      this.productForm.reset();
    }, err => {
      this.toast.error('Failed to add product.');
    });
  }

  deleteProduct(product: any) {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    this.adminService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
      this.toast.success('Product deleted successfully!');
    }, err => {
      this.toast.error('Failed to delete product.');
    });
  }
}
