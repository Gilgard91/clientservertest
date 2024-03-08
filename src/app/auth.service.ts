import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginresponse } from './interface/loginresponse';
import { User, UserResponse } from './interface/user';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Route, Router } from '@angular/router';
import { Indirizzo } from './interface/indirizziResponse';
import { Cliente, ClientiResponse } from './interface/clientiResponse';
import { Fattura, FattureResponse } from './interface/fattureResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.$isLoggedIn.asObservable();
  jwt: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<Loginresponse>('http://localhost:3001/auth/login', {
        email,
        password,
      })
      .pipe(
        map((res: Loginresponse) => {
          // localStorage.setItem('token', res.accessToken);
          this.jwt = res.accessToken;
          this.$isLoggedIn.next(true);
          return res;
        })
      );
  }

  signUp(user: Partial<User>): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      'http://localhost:3001/auth/register',
      user
    );
  }

  logout() {
    console.log('ciao');
    // localStorage.removeItem('token');
    this.jwt = '';
    this.$isLoggedIn.next(false);
  }

  getIndirizzi(): Observable<Indirizzo[]> {
    return this.http.get<Indirizzo[]>('http://localhost:3001/indirizzi', {
      headers: { Authorization: 'Bearer ' + this.jwt },
    });
  }

  getClienti(
    page: number = 0,
    size: number = 10,
    orderBy: string = 'id'
  ): Observable<ClientiResponse> {
    const url = 'http://localhost:3001/clienti';

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderBy', orderBy);

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    });

    return this.http.get<ClientiResponse>(url, { params, headers });
  }

  getClientiNoParams(): Observable<ClientiResponse> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    });
    const url = 'http://localhost:3001/clienti';

    return this.http.get<ClientiResponse>(url, { headers });
  }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('http://localhost:3001/users', {
      headers: { Authorization: 'Bearer ' + this.jwt },
    });
  }

  // getFatture(): Observable<FattureResponse> {
  //   return this.http.get<FattureResponse>('http://localhost:3001/fatture', {
  //     headers: { Authorization: 'Bearer ' + this.jwt },
  //   });
  // }

  getFatture(): Observable<FattureResponse> {
    const url = 'http://localhost:3001/fatture';
    console.log(this.jwt);

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    });

    return this.http.get<FattureResponse>(url, { headers });
  }

  getClientiPerFatturato(minFatturato: number | null): Observable<Cliente[]> {
    const url = `http://localhost:3001/clienti/filtraPerFatturato?minFatturato=${minFatturato}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    });

    return this.http.get<Cliente[]>(url, { headers });
  }

  getFatturePerStato(stato: string): Observable<Fattura[]> {
    const url = `http://localhost:3001/fatture/filtraPerStato?stato=${stato}`;
    // const params = new HttpParams().set('stato', stato);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.jwt,
    });

    return this.http.get<Fattura[]>(url, { headers });
  }

  uploadAvatar(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any>('http://localhost:3001/users/upload', formData, {
      headers: headers,
    });
  }
}
