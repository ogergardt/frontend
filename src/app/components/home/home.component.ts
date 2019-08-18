import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private http: HttpClient, private notification: NotificationService ) { }

  ngOnInit() {
  }

  throwError() {
    throw new Error('My Pretty Error');
  }

  throwHttpError() {
    this.http.get('urlhere').subscribe();
  }

  throwHttpSuccess() {
    this.notification.showSuccess('Success!');
  }
}
