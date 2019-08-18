import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule,
  MatSnackBar,
  MatSnackBarModule,
  MatStepperModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from '../../../services/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      }),
        MatStepperModule, ReactiveFormsModule, MatInputModule, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, MatSnackBarModule
      ],
      providers: [ UserService, { provide: MatSnackBar, useValue: null }],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
