import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Model/product';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() public product;
  @Output() public productAddToCart= new EventEmitter<{product: Product, selectedQuantity: any}>();
  selectedQuantityNum = 1

  constructor(private http: HttpClient) { }
  ngOnInit() { }

  addToCart() {
    this.productAddToCart.emit({product: this.product, selectedQuantity: this.selectedQuantityNum});
  }

  incrementSelectedQuantity() {
    if (this.selectedQuantityNum < this.product.quantity)
      this.selectedQuantityNum++
  }

  decrementSelectedQuantity() {
    if (this.selectedQuantityNum > 0)
      this.selectedQuantityNum--
  }

}
