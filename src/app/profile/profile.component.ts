import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../services/token/token-storage.service';
import { UserService } from '../services/user/user.service';
import {ChangeProfileRequest} from "../services/user/change-profile-request";
import {ToastrService} from "ngx-toastr"; // Предполагается что сервис назван UserService

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
  private profileInfo: ChangeProfileRequest;
  private subscriptions = new Subscription();
  isLoading: boolean = false;

  constructor(private tokenService: TokenStorageService, private userService: UserService,private toastr: ToastrService) { }

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
    this.isLoading = true;
    this.subscriptions.add(this.userService.getUserImage().subscribe(imageUrl => {
      this.imageUrl = imageUrl;
      this.isLoading = false;
    }));
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    console.log(this.info.username);
    this.profileInfo = new ChangeProfileRequest(this.info.username, this.info.email);
    this.isLoading = true;
    this.userService.updateProfile(this.profileInfo).subscribe({
      next: response => {
        this.isEditing = false;
        this.isLoading = false;
        this.toastr.warning('Ваши данные были обновлены. Пожалуйста, пройдите регистрацию заново.');
        setTimeout(() => {
          this.tokenService.signOut();
          window.location.href = 'auth/login';
        }, 2000);
      },
      error: error => {
        this.isLoading = false;
        this.toastr.error('Произошла ошибка при обновлении профиля. ', error.error.message);
        console.error('Error updating profile:', error);
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
