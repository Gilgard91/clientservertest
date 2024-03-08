import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Fattura, FattureResponse } from '../interface/fattureResponse';
import { AuthService } from '../auth.service';
import { Cliente } from '../interface/clientiResponse';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit, AfterViewInit {
  fatture: Fattura[] = [];
  fattureFiltrate: Fattura[] = [];
  // fattura: Fattura | undefined;
  clienti: Cliente[] = [];
  // clienteFilter: string = '';
  statoFatturaFilter: string = '';
  // dataFilter: string = '';
  // importoMinFilter: number | undefined;
  // importoMaxFilter: number | undefined;
  // cliente: Cliente | undefined;
  // orderBy: string = 'id';

  constructor(private authSrv: AuthService) {}
  ngAfterViewInit(): void {
    console.log(this.fatture);
  }

  ngOnInit(): void {
    this.getClientiNoParams();
    this.getFatture();
  }

  // getFatture() {
  //   this.authSrv.getFatture().subscribe({
  //     next: (res) => {
  //       this.fatture = res.content;
  //     },
  //   });
  // }

  getFatture() {
    this.authSrv.getFatture().subscribe({
      next: (res) => {
        this.fatture = res.content;
      },
    });
    this.fattureFiltrate = [];
  }

  getFatturePerStato() {
    if (this.statoFatturaFilter == '') {
      return this.getFatture();
    }
    this.authSrv.getFatturePerStato(this.statoFatturaFilter).subscribe({
      next: (res) => {
        this.fattureFiltrate = res;
        console.log(res);
      },
    });
    this.fatture = [];
  }

  applyFilters() {
    this.getFatturePerStato();
  }

  getClientiNoParams() {
    this.authSrv.getClientiNoParams().subscribe({
      next: (res) => {
        this.clienti = res.content;
      },
    });
  }
}
