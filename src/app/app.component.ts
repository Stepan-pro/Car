import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthServices} from "./services";

@Component({
  selector: 'app-root',
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit{

  constructor(private router:Router, private authServices:AuthServices) {
  }

  ngOnInit(): void {
    if(this.authServices.isAuthorization()){
      this.router.navigate(['cars'])
    }
  }
}
