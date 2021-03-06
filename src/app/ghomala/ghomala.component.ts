import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'ghomala.component.html',
    styles: [`

    .sidenav {
      height: 100%;
      width: 160px;
      position: fixed;
      z-index: 1;
      left: 0;
      background-color: #111;
      overflow-x: hidden;
      padding-top: 20px;
    }
    .sidenav a {
      padding: 6px 8px 6px 16px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
    }
    .sidenav a:hover {
      color: #f1f1f1;
    }
    .main {
      margin-left: 160px; /* Same as the width of the sidenav */
      font-size: 28px; /* Increased text to enable scrolling */
      padding: 0px 10px;
    }
    @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
    }

    .column {
      float: left;
      width: 50%;
  }
  /* Clear floats after the columns */

  .row:after {
      content: "";
      display: table;
      clear: both;
  }

  h1 {text-align:center;}
  h2 {text-align:center;}

	`]
})

export class GhomalaComponent implements OnInit {

    menu: any;

    ngOnInit() {
        this.menu = 1;
    }

    onMenuClic(i) {
        this.menu = i;
        console.log('this.menu = ' + this.menu);
    }

}
