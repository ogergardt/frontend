import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
//import { UserModule } from './user/user.module';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user',   loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
