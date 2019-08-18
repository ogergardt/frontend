import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

import { UserService } from './user.service';


describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
    HttpClientTestingModule, RouterTestingModule],
    providers: [UserService, JwtHelperService]

  }));

  it('should be initialized', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));
});
