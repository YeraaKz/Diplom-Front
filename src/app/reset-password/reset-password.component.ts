import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from "../services/auth/auth.service";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string;
  newPassword: string;
  confirmPassword: string;
  passwordSet = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        response => {
          this.passwordSet = true;
          this.toastr.success('Your password has been reset successfully.', 'Success');
          this.router.navigate(['/profile']).then(() => {
            location.reload();
          });
        },
        error => {
          this.toastr.error('Error resetting password.', 'Error');
        }
      );
    } else {
      this.toastr.error('Passwords do not match.', 'Error');
    }
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'newPassword') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
