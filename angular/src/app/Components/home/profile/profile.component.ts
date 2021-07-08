import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private auth: string;
  userlist: User;
  totalCount: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.userProfile().subscribe(res => {
      console.log(res)
      this.userlist = res;
    }, err => {
      console.log(err)
      alert('There was a problem in loading')
    });

  }

}
