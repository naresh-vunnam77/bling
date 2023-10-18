import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/Product.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  products: Product[] = []

  constructor(private productServe: ProductsService) {

  }

  ngOnInit(): void {
    this.productServe.getProducts().subscribe(productList => {
      this.products = productList
      console.log(this.products)
    })

  }



}
