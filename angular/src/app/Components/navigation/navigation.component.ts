import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private loggedType: string;
  //constructor(){ }
  //constructor(private route: Router) {
    constructor(private auth: ApiService, private route: Router) {
      this.loggedType = "customer";
      if (this.auth.getAuthType() == null) {
        this.route.navigate(['/login']);
      } else {
        if (this.auth.getAuthType() === "CUSTOMER") {
          this.loggedType = "CUSTOMER";
      } else if (this.auth.getAuthType() === "ADMIN") {
        this.loggedType = "ADMIN";
        }
    }
  }

  ngOnInit() {
    //console.log(this.auth.getAuthType());
  }
  
  logout() {
    this.loggedType = null;
    this.auth.removeToken();
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  getCartItems(){
    //this.auth.getCartItems();
    this.route.navigate(['/home/cart']);
  }

  getOrders(){
    this.route.navigate(['/home/orders']);
  }

  profile(){
    this.route.navigate(['/home/profile'])
  }
}
