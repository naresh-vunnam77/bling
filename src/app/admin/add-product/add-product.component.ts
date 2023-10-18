import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  showPreview: boolean = false;
  readonly productForm: any = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(8)]),
    price: new FormControl(0, [Validators.required, Validators.min(10)]),
    category: new FormControl("", [Validators.required, Validators.minLength(8)]),
    description: new FormControl("", [Validators.required, Validators.minLength(8)]),
    imageUrl: new FormControl("", [Validators.required, Validators.minLength(8)])
  })


  constructor(private productService: ProductsService, private router: Router) { }

  onAddProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(data => {
        if (data.id) {
          this.router.navigate(['/products/shoes'])
        }
      })
    }
    this.productForm.reset()
  }
  onPreviewProduct() {
    console.log(this.productForm.value, this.productForm.valid)
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      this.showPreview = true
    }
  }
}
