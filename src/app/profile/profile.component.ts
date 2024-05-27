import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UserService } from '../services/user/user.service'; // Предполагается что сервис назван UserService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  info: any = {};
  imageUrl: string;
  private subscriptions = new Subscription();

  constructor(private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.tokenService.getToken().subscribe(token => {
      this.info.token = token;
    }));
    this.subscriptions.add(this.tokenService.getUsername().subscribe(username => {
      this.info.username = username;
      // Загрузить изображение после получения username
    }));
    this.subscriptions.add(this.tokenService.getAuthorities().subscribe(authorities => {
      this.info.authorities = authorities;
    }));
    this.loadUserImage();
    console.log(this.imageUrl);
  }

  loadUserImage() {
    const userId = this.tokenService.getId();
    console.log(userId);
    this.subscriptions.add(this.userService.getUserImage().subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    }));
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
