import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientservertest';
  isLoggedIn = false;

  constructor(private authSrv: AuthService){
    this.authSrv.isLoggedIn.subscribe(data => this.isLoggedIn = data)
  }
}
