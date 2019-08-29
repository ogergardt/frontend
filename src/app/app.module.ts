import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { User } from './user/dtos/user.dto';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule, MatMenuModule, MatSnackBar, MatSnackBarModule} from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import {GlobalErrorHandler} from './global-error-handler';
import {ServerErrorInterceptor} from './server-error.interceptor';
import { SearchComponent } from './components/search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BoldPipe } from './pipes/bold.pipe';

export function tokenGetter() {
  const user: User = JSON.parse(localStorage.getItem('currentUser'));
  return user !== null ? user.token : '';
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    BoldPipe,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    MatMenuModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    JwtHelperService,
    AuthGuard,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
