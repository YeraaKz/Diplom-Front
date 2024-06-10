import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string;
  emailSent = false;

  constructor(private authService: AuthService, private toastr: ToastrService,private router: Router, private location: Location) { }

  onSubmit(): void {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe(
        response => {
          this.emailSent = true;
          this.toastr.info('Check your email for password reset instructions.', 'Email Sent');
        },
        error => {
          console.log(error.error.message)
          this.toastr.error('Failed to send password reset email.', 'Error');
        }
      );
    }
  }


  goBack(): void {
    this.location.back();
  }
}
