import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../services/auth/auth.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  token: string;
  newPassword: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        console.log('Password has been reset successfully', response);
      },
      error => {
        console.error('Error resetting password', error);
      }
    );
  }
}
