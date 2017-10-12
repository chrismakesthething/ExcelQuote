import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../services/auth.service';
import { LogServiceService } from '../services/log-service.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: any;
  passReset = false;
  rememberMe = false;
  cookieValue = 'UNKNOWN';
  private name: String = 'logService';
  // @localStorage() public email: string = '';
  // @localStorage() public rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    private cookieService: CookieService,
    private snackBar: MdSnackBar) { }

    globalFormControl = new FormControl('', [
      Validators.required]
    );

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  toggleEditable(e: Event) {
    if (this.rememberMe === true) {
      // Do a thing
      console.log('toggle set to false!');
      this.rememberMe = false;
      this.cookieService.deleteAll();
    } else {
      // Do another thing
      console.log('toggle set to true!');
      this.rememberMe = true;
      this.cookieService.set('rememberMe', 'true', 2030);
      this.cookieValue = this.cookieService.get('isChecked');
    }
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => this.passReset = true);
  }
}
