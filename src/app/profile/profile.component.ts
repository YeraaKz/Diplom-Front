import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UserService } from '../services/user/user.service'; // Предполагается что сервис назван UserService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  info: any = {};
  imageUrl: string;
  passwordFieldType: string = 'password';
  isEditing: boolean = false;
  private subscriptions = new Subscription();

  constructor(private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.tokenService.getToken().subscribe(token => {
      this.info.token = token;
    }));
    this.subscriptions.add(this.tokenService.getUsername().subscribe(username => {
      this.info.username = username;
    }));
    this.subscriptions.add(this.tokenService.getEmail().subscribe(email => {
      this.info.email = email;
    }));
    this.subscriptions.add(this.tokenService.getAuthorities().subscribe(authorities => {
      this.info.authorities = authorities;
    }));
    this.loadUserImage();
  }

  onCameraIconClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.userService.uploadFile(file).subscribe({
        next: response => {
          this.loadUserImage();
          window.location.reload();
        },
        error: err => {
          console.error('Ошибка загрузки изображения:', err);
        }
      });
    }
  }

  loadUserImage(): void {
    this.subscriptions.add(this.userService.getUserImage().subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    }));
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    this.userService.updateProfile({ username: this.info.username, email: this.info.email }).subscribe({
      next: response => {
        this.tokenService.saveUsername(this.info.username);
        this.tokenService.saveEmail(this.info.email);
        this.isEditing = false;
        window.location.reload();
      },
      error: err => {
        console.error('Ошибка обновления профиля:', err);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
