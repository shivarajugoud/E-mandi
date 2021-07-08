import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  private addProduct: any;
  products: Product[] = [];
  showAdd = false;
  auth: string;

  constructor(private api: ApiService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.addProduct = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['',Validators.required],
      quantity: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      price: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.showAdd = false
      this.addProduct.reset()
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          this.products = res;
          console.log(this.products)
        }
      );
    }
  }

  get f() { return this.addProduct.controls; }
  
  show() {
    this.showAdd = true;
  }

  hide() {
    this.showAdd = false;
  }

  addProd() {
    const data = this.addProduct.value
    this.api.addProduct(data.productName, data.description, data.quantity, data.price, data.imageUrl).subscribe(res => {
      console.log(res)
      this.ngOnInit()
    }, err => {
      console.log(err)
      alert('There was a problem!')
    });
  }

  delProd(productId:any) {
    this.api.deleteProduct(productId.value).subscribe(res => {
      this.products = res;
      console.log(this.products)
      this.ngOnInit();
    }, err => {
      console.log(err)
      alert('Something went wrong!')
    });
    
  }

  edit(prodid:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
  }
}
