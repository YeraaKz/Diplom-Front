import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthId';
const EMAIL_KEY = 'AuthEmail';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private rolesSubject: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private idSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private emailSubject: BehaviorSubject<string> = new BehaviorSubject('');


  constructor() {
    this.loadInitialStorage();
  }

  // Загрузка начальных значений из sessionStorage
  private loadInitialStorage() {
    const authorities = sessionStorage.getItem(AUTHORITIES_KEY);
    const username = sessionStorage.getItem(USERNAME_KEY);
    const token = sessionStorage.getItem(TOKEN_KEY);
    const id = sessionStorage.getItem(ID_KEY);
    const email = sessionStorage.getItem(EMAIL_KEY);

    this.rolesSubject.next(authorities ? JSON.parse(authorities) : []);
    this.usernameSubject.next(username ?? '');
    this.tokenSubject.next(token ?? '');
    this.idSubject.next(id ?? '');
    this.emailSubject.next(email ?? '');
  }

  public signOut() {
    window.sessionStorage.clear();
    this.rolesSubject.next([]);
    this.usernameSubject.next('');
    this.tokenSubject.next('');
    this.idSubject.next('');
    this.emailSubject.next('');
  }

  public saveToken(token: string) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  public getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  public saveUsername(username: string) {
    window.sessionStorage.setItem(USERNAME_KEY, username);
    this.usernameSubject.next(username);
  }

  public getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    this.rolesSubject.next(authorities);
  }

  public getAuthorities(): Observable<string[]> {
    return this.rolesSubject.asObservable();
  }

  public saveId(id: string) {
    window.sessionStorage.setItem(ID_KEY, id);
    this.idSubject.next(id);
  }

  public getId(): Observable<string>{
    return this.idSubject.asObservable();
  }

  public saveEmail(email: string) {
    window.sessionStorage.setItem(EMAIL_KEY, email);
    this.emailSubject.next(email);
  }

  public getEmail(): Observable<string> {
    return this.emailSubject.asObservable();
  }
}
