export class JwtResponse {
  token: string;
  type: string;
  id: string;
  username: string;
  email: string;
  roles: string[];

  constructor(token: string, type: string, username: string) {
    this.token = token;
    this.type = type;
    this.username = username;
    this.roles = ['user'];
  }
}
