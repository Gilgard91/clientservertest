import { Component } from '@angular/core';
import { User } from '../interface/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  file: File = new File([''], '');
  constructor(private authSrv: AuthService, private router: Router) {}

  userData: User = {
    username: null,
    email: null,
    password: null,
    nome: null,
    cognome: null,
    avatar: null,
    ruolo: 'USER',
  };

  signUp() {
    this.authSrv.signUp(this.userData).subscribe({
      next: (res) => {
        if (res.id) {
          console.log('ok', res);
          this.uploadAvatar(this.file, res.id);
          this.router.navigate(['']);
        }
      },
      error: (err) => console.log('nope', err),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  uploadAvatar(file: File, id: string) {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('id', id);

    this.authSrv.uploadAvatar(formData).subscribe({
      next: (responseUrl: any) => {
        this.userData.avatar = responseUrl;
      },
      error: (err) => console.log('Error uploading avatar:', err),
    });
  }
}
