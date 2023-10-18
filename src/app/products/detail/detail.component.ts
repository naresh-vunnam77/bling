import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/Product.model';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  };
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        console.log('ID:', id);
        return this.productService.getProduct(id); // Replace with your own logic
      })
    ).subscribe((productData) => {
      this.product = productData
      console.log('Product Data:', this.product);
    });

  }







}
