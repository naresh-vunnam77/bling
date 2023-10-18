import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = []

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cartService.getCartItems())
    this.cartService.getCartItems().valueChanges().subscribe((data) => {
      console.log(data)
      this.cartItems = data
    })
  }

}
