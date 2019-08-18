import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule, MatSnackBarModule} from "@angular/material";
import { MatSnackBar } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule} from '@auth0/angular-jwt';
import { RouterTestingModule} from '@angular/router/testing';
import { UserService} from '../../../services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      }),
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [ UserService, /*JwtHelperService,*/ { provide: MatSnackBar, useValue: null }],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
