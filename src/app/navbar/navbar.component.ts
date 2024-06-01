import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from "../services/token/token-storage.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  roles: string[] = [];
  authority: string;
  name: string;
  imageUrl: string;
  dropdownOpen = false;
  currentLanguage = 'ru';
  languageDropdownOpen = false;
  private subscriptions = new Subscription();

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService) { }

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
    this.loadUserImage();

  }

  determineAuthority() {
    this.authority = this.roles.find(role => role === 'ROLE_ADMIN') ? 'admin' :
      this.roles.find(role => role === 'ROLE_PM') ? 'pm' : 'user';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.languageDropdownOpen) {
      this.languageDropdownOpen = false;
    }
  }

  toggleLanguageDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.languageDropdownOpen = !this.languageDropdownOpen;
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  loadUserImage(): void {
    this.subscriptions.add(this.userService.getUserImage().subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    }));
  }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    this.languageDropdownOpen = false; // Close dropdown after selection
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
