import { Component, OnInit } from '@angular/core';
import {User} from '../../dtos/user.dto';
import {UserService} from '../../../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(resp => {
      this.user = resp;
      this.user.createdAt = new Date( parseInt( resp.id.substring(0,8), 16 ) * 1000 )});
  }

}
