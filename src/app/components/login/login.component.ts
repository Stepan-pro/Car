import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthServices} from "../../services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private authServices: AuthServices, private router: Router) {
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    })
  }

  login(): void {
    this.authServices.login(this.form.getRawValue()).subscribe(value => {
      this.authServices.setToken(value)
      this.router.navigate(['cars'])
    })
  }
}
