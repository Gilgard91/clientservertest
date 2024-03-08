import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // email!: string;
  // password!: string;
  error!: string | null;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private errorSrv: ErrorService
  ) {
    this.errorSrv.error.subscribe(res => {
      console.log(res);
      this.error = res})
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authSrv.login(email, password).subscribe({
      next: (data) => {
        // localStorage.setItem('token', data.accessToken);
        data.accessToken;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('errore LUL', err);
      },
    });
  }
}
