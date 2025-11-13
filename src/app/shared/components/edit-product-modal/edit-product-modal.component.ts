import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html'
})
export class EditProductModalComponent {
  @Input() close!: (result?: any) => void;
  @Input() product: any;
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private toast: ToastrService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [this.product.id, Validators.required],
      name: [this.product.name, Validators.required],
      img: [this.product.img, Validators.required],
      price: [this.product.price, Validators.required],
      description: [this.product.description, Validators.required],
      alt: [this.product.alt, Validators.required],
      category: [this.product.category, Validators.required],
      carbrand: [this.product.carbrand, Validators.required]
    });
  }

  saveProduct() {
    if (this.productForm.invalid) return;
    this.adminService.updateProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.toast.success('Product updated successfully!');
        this.close(res); 
      },
      error: () => {
        this.toast.error('Failed to update product.');
      }
    });
  }

  cancel() {
    this.close(false);
  }
}
