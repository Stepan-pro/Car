import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {AuthServices} from "../../services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  userNameError!: string;


  constructor(private authServices: AuthServices, private router: Router) {
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    }, [this._checkPassword])
  }


  register(): void {
    const rawValue = this.form.getRawValue()
    delete rawValue.confirmPassword;
    this.authServices.register(rawValue).subscribe({
        next: () => this.router.navigate(['login']),
        error: e => this.userNameError = e.error.username[0]
      }
    )
  }


  _checkPassword(form: AbstractControl): ValidationErrors | null {
    let password = form.get('password')
    let confirmPassword = form.get('confirmPassword')
    return password?.value === confirmPassword?.value ? null : {notSave: true}

  }
}
