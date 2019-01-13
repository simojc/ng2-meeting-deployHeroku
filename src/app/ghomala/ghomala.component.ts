import { Component, OnInit } from '@angular/core';

//import { IUser } from  '../../Models/index'
//import { UserService } from '../user.service';
//import { AlertService } from '../../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'ghomala.component.html',
  styles: [`
 
            body{
                color:#000000;
                margin-left:0;
                margin-right:0;
                margin-top:0;
                margin-bottom:0;
                margin-width:0;
                margin-height:0;
                background-color:#A3A6BA;
            }
            .text {
            font-family:Verdana, Arial, Helvetica, sans-serif;
            font-size:10px;
            color:541460;
            padding:5px;
            }
                div.container {
                  width: 100%;
                  border: 1px solid gray;
              }

              header, footer {
                  padding: 1em;
                  color: white;
                  background-color: black;
                  clear: left;
                  text-align: center;
              }

              nav {
                  float: left;
                  max-width: 160px;
                  margin: 0;
                  padding: 1em;
              }

              nav ul {
                  list-style-type: none;
                  padding: 0;
              }
   
              nav ul a {
                  text-decoration: none;
              }

              article {
                  margin-left: 170px;
                  border-left: 1px solid gray;
                  padding: 1em;
                  overflow: hidden;
              }

              a:hover {
                cursor:pointer;
               }

               div.a {
                text-align: center;
            }
	`]
})

export class GhomalaComponent implements OnInit {
  //currentUser: IUser;
  //users: IUser[] = [];
menu: any;

  ngOnInit() {
    // this.loadAllUsers();
    this.menu = 1;
  }

onMenuClic(i){
    this.menu = i;
}




}
