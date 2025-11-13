import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html'
})
export class AddProductModalComponent {
  @Input() close!: (result?: any) => void;
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private toast: ToastrService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      alt: ['', Validators.required],
      category: ['', Validators.required],
      carbrand: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  addProduct() {
    if (this.productForm.invalid) return;

    const newProduct = { ...this.productForm.value };

    this.adminService.addProduct(newProduct).subscribe({
      next: (res) => {
        this.toast.success('Product added successfully!');
        this.close(res);
      },
      error: () => {
        this.toast.error('Failed to add product.');
      }
    });
  }

  cancel() {
    this.close(false);
  }
}
