import { Product } from 'src/app/shared/Product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  };
  showPreview: boolean = false;

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        console.log('ID:', id);
        return this.productService.getProduct(id);
      })
    ).subscribe((productData) => {
      this.product = productData
      console.log('Product Data:', this.product);
      this.updateForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        description: this.product.description,
        imageUrl: this.product.imageUrl
      });
    });
  }

  readonly updateForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(8)]),
    price: new FormControl(0, [Validators.required, Validators.min(10)]),
    category: new FormControl("", [Validators.required, Validators.minLength(8)]),
    description: new FormControl("", [Validators.required, Validators.minLength(8)]),
    imageUrl: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  onUpdateProduct() {
    if (this.updateForm.valid) {
      const updateProduct: any = {}
      updateProduct.id = this.product.id
      updateProduct.name = this.updateForm.value.name
      updateProduct.price = this.updateForm.value.price
      updateProduct.category = this.updateForm.value.category
      updateProduct.imageUrl = this.updateForm.value.imageUrl
      this.productService.updateProduct(this.product.id, updateProduct).subscribe(data => {
        if (data.id) {
          this.router.navigate(['/admin/products'])
        }
      })
    }
  }
  onPreviewProduct() {

    console.log(this.updateForm.value, this.updateForm.valid)
    if (this.updateForm.valid) {
      console.log(this.updateForm.value)
      this.showPreview = true
    }
  }

}
