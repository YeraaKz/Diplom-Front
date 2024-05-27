import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from "../services/token/token-storage.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  roles: string[] = [];
  authority: string;
  name: string;
  dropdownOpen = false;
  private subscriptions = new Subscription();

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.subscriptions.add(this.tokenStorage.getToken().subscribe(token => {
      if (token) {
        this.subscriptions.add(this.tokenStorage.getAuthorities().subscribe(authorities => {
          this.roles = authorities;
          this.determineAuthority();
        }));
        this.subscriptions.add(this.tokenStorage.getUsername().subscribe(username => {
          this.name = username;
        }));
      } else {
        this.roles = [];
        this.name = '';
        this.authority = '';
      }
    }));
  }

  determineAuthority() {
    this.authority = this.roles.find(role => role === 'ROLE_ADMIN') ? 'admin' :
      this.roles.find(role => role === 'ROLE_PM') ? 'pm' : 'user';
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
