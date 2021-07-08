import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Cart } from 'src/app/Model/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  private auth: string;
  cartlist: Cart[];
  totalSum: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      console.log(res)
      this.cartlist = res;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    }, err => {
      console.log(err)
      alert('There was a problem in loading')
    });

  }
  updateCart(quantity:any) {
    this.api.updateCartItem(this.api.getUserId(), quantity).subscribe(res => {
      this.cartlist = res;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  
  deleteItem($productName:any) {
    this.api.deleteCartItem(this.api.getUserId(), $productName).subscribe(res => {
      console.log(res)
      alert('Product removed from cart!')
      this.route.navigate(['/home']);
      this.cartlist = res;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum - (value.quantity * value.price);
      });
    });
  }

  placeOrder() {
    this.api.placeOrder().subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    });
    alert('Order placed succesfully! Keep shopping <3')
    this.route.navigate(['/home']);
  }

}
