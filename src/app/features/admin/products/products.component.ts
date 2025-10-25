import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/core/services/admin.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { AddProductModalComponent } from 'src/app/shared/components/add-product-modal/add-product-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { EditProductModalComponent } from 'src/app/shared/components/edit-product-modal/edit-product-modal.component';

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
    private toast: ToastrService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    
  }


  openAddProductModal(){
    this.modal.open(AddProductModalComponent).subscribe((result) => {
      if (result){
        this.products.push(result);
        this.products.sort((a: any, b: any) => Number(b.id) - Number(a.id));
      }
    })
  }

  openEditProductModal(product: any) {
  this.modal.open(EditProductModalComponent, { product }).subscribe((updatedProduct) => {
    if (updatedProduct) {
      // Update product in local array
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index > -1) {
        this.products[index] = updatedProduct;
      }
      this.products.sort((a: any, b: any) => Number(b.id) - Number(a.id));
    }
  });
}

  loadProducts() {
  this.adminService.getProducts().subscribe(res => {
    // Sort in descending order by ID
    this.products = res.sort((a: any, b: any) => b.id - a.id);
  });
}


  addProduct() {
  if (this.productForm.invalid) return;

  const newProduct = {
    
    ...this.productForm.value
  };

  this.adminService.addProduct(newProduct).subscribe({
    next: (res) => {
      this.products.push(res);
      // 🔹 Sort in descending order immediately after adding
      this.products.sort((a: any, b: any) => b.id - a.id);

      this.toast.success('Product added successfully!');
      this.productForm.reset();
    },
    error: () => {
      this.toast.error('Failed to add product.');
    }
  });
}


  deleteProduct(product: any) {
  this.modal
    .open(ConfirmationModalComponent, {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?'
    })
    .subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Proceed only if user confirmed
        this.adminService.deleteProduct(product.id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id);
            this.toast.success('Product deleted successfully!');
          },
          error: () => {
            this.toast.error('Failed to delete product.');
          }
        });
      } else {
        this.toast.info('Deletion cancelled.');
      }
    });
}

}
