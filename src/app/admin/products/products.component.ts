import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/Product.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = []

  constructor(private productServe: ProductsService, private router: Router) {

  }

  ngOnInit(): void {
    this.productServe.getProducts().subscribe(productList => {
      this.products = productList
      console.log(this.products)
    })

  }

  onDelete(id: string) {
    this.productServe.deleteProduct(id).subscribe(data => {
      if (data.message) {
        this.router.navigate(['/products/shoes'])
      }
    })
  }
}
