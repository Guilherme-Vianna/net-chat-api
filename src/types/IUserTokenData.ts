export class UserTokenData {
  constructor(id: string, username: string, email: string) {
    this.sub = id;
    this.username = username;
    this.email = email;
  }
  sub: string;
  username: string;
  email: string;
}
