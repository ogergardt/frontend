import { Component, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService} from './services/user.service';
import { MatSidenav} from '@angular/material';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logo = 'front';
  menu = 'menu';
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private router: Router) {
    //this.user = this.userService.currentUser;
  }
  async onLogout() {
    this.userService.logoutUser();
    await this.router.navigate(['']);
  }
}
