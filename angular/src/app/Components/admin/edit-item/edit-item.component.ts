import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  private editItem: any;

  product: Product = {
    productId: '',
    imageUrl: '',
    description: '',
    price: '',
    productName: '',
    quantity: ''
  };
  products: Product[] = [];
  auth: string;
  productId: string;
  imageUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService,
              private formBuilder: FormBuilder) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(res => {
        res.forEach(pro => {
          if (pro.productId == this.productId) {
            this.product = pro
          }
        });
      });
    }
  }

  ngOnInit() {
    this.createForm()
    this.route.queryParams.subscribe(params => {
      this.productId = params["productId"];
    });
  }

  createForm() {
    this.editItem = this.formBuilder.group({
      productName: ['', Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required]
    })
  }

  updateProd() {
    if (this.editItem.value.productName === '')
      this.editItem.value.productName = this.product.productName
    if (this.editItem.value.description === '')
      this.editItem.value.description = this.product.description
    if (this.editItem.value.quantity === '')
      this.editItem.value.quantity = this.product.quantity
    if (this.editItem.value.price === '')
      this.editItem.value.price = this.product.price
    if (this.editItem.value.imageUrl === '')
      this.editItem.value.imageUrl = this.product.imageUrl
    this.api.updateProduct(this.editItem.value.productName, this.editItem.value.description, this.editItem.value.quantity, this.editItem.value.price, this.editItem.value.imageUrl, this.productId).subscribe(res => {
      this.router.navigate(["/admin"])
    },
      err => {
        console.log(err)
    });
  }

}
