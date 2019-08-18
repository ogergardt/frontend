import {inject, TestBed} from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {MatSnackBar} from '@angular/material';
import {JwtHelperService} from '@auth0/angular-jwt';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ],
    providers: [ NotificationService, { provide: MatSnackBar, useValue: null } ]
  }));

  it('should be initialized', inject([NotificationService], (notifier: NotificationService) => {
    expect(notifier).toBeTruthy();
  }));
});
