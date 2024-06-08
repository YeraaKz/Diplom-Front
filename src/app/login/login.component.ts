import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token/token-storage.service';
import { AuthLoginInfo } from '../services/token/login-info';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isLoading: boolean = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private router: Router,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.tokenStorage.getToken().subscribe(token => {
      if (token) {
        this.isLoggedIn = true;
        this.tokenStorage.getAuthorities().subscribe(roles => {
          this.roles = roles;
        });
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        this.tokenStorage.saveId(data.id); // Сохранение ID пользователя
        this.tokenStorage.saveEmail(data.email); // Сохранение email пользователя

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.tokenStorage.getAuthorities().subscribe(roles => {
          this.roles = roles;
        });
        this.isLoading = false;

        this.router.navigate(['/profile']).then(() => {
          location.reload();
        });
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.isLoading = false;
        this.toastr.error(this.errorMessage);
      }
    );
  }

  checkCertificate(): void {
    this.toastr.error("Error: The certificate has expired for this service.");
  }
}
