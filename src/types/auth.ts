export type Role = 'student' | 'faculty';

export interface LoginCredentials {
  id: string;
  password: string;
  role: Role;
}

export interface User {
  id: string;
  name: string;
  role: Role;
}