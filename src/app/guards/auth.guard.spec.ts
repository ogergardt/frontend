import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {RouterTestingModule} from '@angular/router/testing';

import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      }),
        HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, JwtHelperService]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
