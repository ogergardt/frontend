import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../user/dtos/register-user.dto';
import { LoginUser } from '../user/dtos/login-user.dto';
import { Observable } from 'rxjs';
import { User } from '../user/dtos/user.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router) {
  }

  public registerUser(dto: RegisterUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${environment.apiBaseUrl}/api/auth/signup`, dto, httpOptions).pipe(
      tap(
        (data: User) => {
          const user: User = Object.assign(new User(), data);
          this.storeData(user);
          this.router.navigate(['/user/dashboard']);
        },
        error  => { error.error.message = error.error.message ? error.error.message : 'Internal Server Error' },
      ),
    );
  }

  public loginUser(dto: LoginUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${environment.apiBaseUrl}/api/auth/signin`, dto, httpOptions).pipe(
      tap(
        (data: User) => {
          const user: User = Object.assign(new User(), data);
          this.storeData(user);
          this.router.navigate(['/user/dashboard']);
        },
        error  => { error.error.message = error.error.message ? error.error.message : 'Internal Server Error' },
      ),
    );
  }

  public getProfile(): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token, 'Content-Type': 'application/json',
      },),
    };
    return this.http.get<User>(`${environment.apiBaseUrl}/api/users/me`, httpOptions);
  }

  public getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.http.get(`/users`, httpOptions);
  }

  public isUsernameTaken(username: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`/users/username`, { username }, httpOptions).pipe(
      map(isTaken => {
        return !!isTaken;
      }),
    );
  }

  public logoutUser() {
    localStorage.removeItem('currentUser');
  }

  public storeData(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  get token(): string {
    if (this.isLoggedIn) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
    return '';
  }

  get currentUser(): User {
    if (this.isLoggedIn) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  }

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')) !== null && !this.helper.isTokenExpired();
  }
}
