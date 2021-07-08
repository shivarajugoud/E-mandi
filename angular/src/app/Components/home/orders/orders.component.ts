import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/order';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private auth: string;
  orderlist: Order[];
  totalCount: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.viewMyOrders().subscribe(res => {
      console.log(res)
      this.orderlist = res;
      this.orderlist.forEach(value => {
        this.totalCount++;
      });
    }, err => {
      console.log(err)
      alert('There was a problem in loading')
    });

  }

}
