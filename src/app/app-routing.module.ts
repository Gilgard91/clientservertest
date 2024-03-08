import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HomeGuard } from './home/home.guard';
import { FattureComponent } from './fatture/fatture.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },

  { path: 'home/fatture', component: FattureComponent },

  { path: '', component: LoginComponent },

  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
