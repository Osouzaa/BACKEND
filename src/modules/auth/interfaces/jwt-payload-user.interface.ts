export interface JwtPayloadUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  cpf: string;
  role: 'admin';
}
