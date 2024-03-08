export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  nome: string | null;
  cognome: string | null;
  avatar: string | null;
  ruolo: string | null;
}

export interface UserResponse {
  id: string | null;
  username: string | null;
  email: string | null;
  nome: string | null;
  cognome: string | null;
  avatar: string | null;
  ruolo: string | null;
}
