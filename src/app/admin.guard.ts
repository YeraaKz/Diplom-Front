import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "./services/auth/auth.service";
import {map, Observable} from "rxjs";
import {UserService} from "./services/user/user.service";
import {ERole, Role} from "./services/user/role";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService:UserService, private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getUserById(this.authService.getCurrentUserId()).pipe(
      map(user => {
        if (user && user.roles.some(role => role.name === ERole.ROLE_ADMIN)) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
