import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Indirizzo } from '../interface/indirizziResponse';
import { User, UserResponse } from '../interface/user';
import { Cliente } from '../interface/clientiResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  indirizzi: Indirizzo[] = [];
  users: UserResponse[] = [];
  clienti: Cliente[] = [];
  clientiFiltrati: Cliente[] = [];
  fatturatoFilter: number | null = null;
  orderBy: string = 'id';
  cliente: Cliente | undefined;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getIndirizzi();
    this.getUsers();
    this.getClienti();
  }

  getIndirizzi() {
    this.authSrv.getIndirizzi().subscribe({
      next: (res) => {
        this.indirizzi = res;
      },
    });
  }

  getUsers() {
    this.authSrv.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
    });
  }

  getClientiPerFatturato() {
    this.authSrv.getClientiPerFatturato(this.fatturatoFilter).subscribe({
      next: (res) => {
        this.clientiFiltrati = res;
      },
    });
    this.clienti = [];
  }

  getClienti() {
    this.authSrv.getClienti(0, 10, this.orderBy).subscribe({
      next: (res) => {
        this.clienti = res.content;
        console.log(this.clienti);
      },
    });
    this.clientiFiltrati = [];
  }

  onOrderByChange(): void {
    this.getClienti();
  }

  applyFilters() {
    this.getClientiPerFatturato();
  }
}
