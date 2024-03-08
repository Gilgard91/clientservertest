export interface FattureResponse {
  content: Fattura[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Fattura {
  id: number;
  data: Date | string;
  importo: number;
  cliente: Cliente;
  statoFattura: StatoFattura;
}

export interface StatoFattura {
  id: string;
  nomeStatoFattura: NomeStatoFattura;
}

export enum NomeStatoFattura {
  Scartata = 'SCARTATA',
  InBozza = 'IN BOZZA',
  Consegnata = 'CONSEGNATA',
  Inviata = 'INVIATA',
  InElaborazione = 'IN ELABORAZIONE',
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Cliente {
  id: string;
  ragioneSociale: string;
  partitaIva: string;
  email: string;
  dataInserimento: Date;
  dataUltimoContatto: Date;
  fatturatoAnnuale: number;
  pec: string;
  telefono: string;
  emailContatto: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  logoAziendale: string;
  tipoCliente: string;
  indirizzoSedeOperativa: IndirizzoSede | null;
  indirizzoSedeLegale: IndirizzoSede;
  fatture: any[];
}

export interface IndirizzoSede {
  id: number;
  via: string;
  civico: number;
  CAP: number;
  comune: Comune;
}

export interface Comune {
  id: number;
  nome: string;
  provincia: Provincia;
}

export interface Provincia {
  id: number;
  nome: string;
  sigla: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
