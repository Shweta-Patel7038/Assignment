import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
settings = {
    mode: 'external',
    sort: true,
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit" style="font-size:32px"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fa-trash" style="font-size:32px"></i>',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel',   
    },
    columns: {
      id: {
        title: 'ID',
      },

      userId: {
        title: 'UserID',
      },
      title: {
        title: 'Title',
      },
      body: {
        title: 'Body',
      },
    },
    attr: {
      class: 'table table-bordered'
    }
  };
  products:any=[];
  currentuser:any;
  constructor(private http: HttpClient,private router:Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    let currentuser= (JSON.parse(localStorage.getItem('currentUser')));
    this.currentuser=currentuser.firstName;
    console.log(this.currentuser)
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe(data=>{
      this.products=data;
      this.products = new LocalDataSource(this.products);
      this.products.setPaging(2,5,true)
      // this.products.setPage(2);
    });
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
