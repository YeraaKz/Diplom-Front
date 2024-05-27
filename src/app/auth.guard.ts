import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './services/token/token-storage.service';
import { Observable, map } from 'rxjs';  // Импортируйте map из rxjs

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.tokenStorageService.getToken().pipe(
      map(token => {
        if (token) {
          return true;
        } else {
          this.router.navigate(['/notfound']);
          return false;
        }
      })
    );
  }
}
