import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CdkStepper } from '@angular/cdk/stepper';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { RegisterUser } from '../../dtos/register-user.dto';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  usernameControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;
  isEditable = false;

  @ViewChild('verticalStepper', {static: true} ) verticalStepper: CdkStepper;

  constructor( private userService: UserService, private snackbar: MatSnackBar ) {
  }

  ngOnInit() {

    this.usernameControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)]));
    this.emailControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)]));
    this.passwordControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)]));
    this.confirmPasswordControl = new FormControl('', [ Validators.required ]);

    this.registerFormGroup = new FormGroup({
      username: this.usernameControl,
      email: this.emailControl,
      password: this.passwordControl,
      repeatPassword: this.confirmPasswordControl,
    }, {
      validators: ((control: FormGroup) => {
        const password = control.get('password').value;
        const repeatPassword = control.get('repeatPassword').value;
        if (password !== repeatPassword) {
          control.get('repeatPassword').setErrors({ confirmPassword: true });
        } else {
          return null;
        }
      }),
    });
  }

  get email() {
    return this.registerFormGroup.get('email');
  }

  get username() {
    return this.registerFormGroup.get('username');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  submitHandler() {
    const dto: RegisterUser = new RegisterUser();
    dto.username = this.username.value;
    dto.email = this.email.value;
    dto.password = this.password.value;
    this.userService.registerUser(dto).pipe(
      catchError(error => {
        throw Error(error.error.message);
        this.verticalStepper.reset();
        return of(error);
      }),
    ).subscribe();
  }
}
