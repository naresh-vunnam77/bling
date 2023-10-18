import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database'
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  cartRef!: AngularFireList<any[]>;
  cartItemRef!: AngularFireObject<any>;
  constructor(private ngFireDB: AngularFireDatabase, private authService: AuthenticationService) {


  }

  getCartItems() {
    return this.cartRef
  }

  addToCart(product: any) {
    const cartItem: any = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      totalAmount: product.price
    }
    this.cartRef.valueChanges().subscribe((cart) => {
      this.cartItems = cart
    })
    if (this.cartItems.length > 0) {

    } else {
      this.cartRef.push(cartItem)
    }

  }
}
