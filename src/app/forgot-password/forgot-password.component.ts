import { Component } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email: string;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        console.log('Password reset link sent to email', response);
      },
      error => {
        console.error('Error sending password reset link', error);
      }
    );
  }

}
