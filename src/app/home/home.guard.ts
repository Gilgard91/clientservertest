import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  isLoggedIn!: boolean;
  constructor(private authSrv: AuthService, private router: Router) {
    
    authSrv.isLoggedIn.subscribe((res) => {
      console.log(res);
      (this.isLoggedIn = res)});
  }

  canActivate(): boolean {
    
      if (this.isLoggedIn) {
       
        return true;
      } else {
       
        this.router.navigate(['']);
        return false;
      }
}
}
