import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { LoginUser } from '../../dtos/login-user.dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private userService: UserService, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get username() {
    return this.loginFormGroup.get('username');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  submitHandler() {
    if (!(this.username.invalid || this.password.invalid)) {
      const form = this.loginFormGroup;
      const dto: LoginUser = new LoginUser();
      dto.username = form.get('username').value;
      dto.password = form.get('password').value;
      this.userService.loginUser(dto).pipe(
        catchError(error => {
          throw new Error(error.error.message);
          this.loginFormGroup.reset();
          return of(error);
        }),
      ).subscribe();
    }
  }
}

