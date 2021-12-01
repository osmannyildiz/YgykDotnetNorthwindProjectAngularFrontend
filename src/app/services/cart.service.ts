import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  getCart(): CartItem[] {
    return CartItems;
  }
  
  addToCart(product: Product) {
    let cartItem = CartItems.find(ci => ci.product.productId === product.productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItem = {
        product: product,
        quantity: 1
      };
      CartItems.push(cartItem);
    }
  }

  removeFromCart(product: Product) {
    let cartItem = CartItems.find(ci => ci.product.productId === product.productId);
    if (cartItem) {
      CartItems.splice(CartItems.indexOf(cartItem), 1);
    }
  }
}
