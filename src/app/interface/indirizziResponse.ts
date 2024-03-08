export interface Indirizzo {
  id: string;
  via: string;
  civico: number;
  cap: number;
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
