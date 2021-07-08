import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
    console.log('hello',this.api.getUserId())
    if (this.api.isAuthenticated) {
      this.api.getProducts().subscribe(res => {
          this.products = res
      });
    }
  }

  addToCart(data) {
    const addedProduct = data.product
    const selectedQuantity = data.selectedQuantity
    this.api.addToCart(addedProduct, selectedQuantity).subscribe(res => {
      console.log(res);
      alert('Product added successfully!')
      this.route.navigate(['/home']);
    }, err => {
      alert('Something went Wrong')
      console.log(err)
    })
  }

}
