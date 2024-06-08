import { Component } from '@angular/core';
import { CryptoService } from '../services/crypto/crypto.service';

@Component({
  selector: 'app-crypto-checker',
  templateUrl: './crypto-checker.component.html',
  styleUrls: ['./crypto-checker.component.css']
})
export class CryptoCheckerComponent {
  cryptoName: string;
  result: any;
  public isLoading: boolean = false;

  constructor(private cryptoService: CryptoService) { }

  onSubmit(): void {
    this.isLoading = true;
    this.result = null;
    this.cryptoService.checkCrypto(this.cryptoName).subscribe(
      data => {
        setTimeout(() => {
          this.result = data;
          this.isLoading = false;
        }, 5000);
      },
      error => {
        setTimeout(() => {
          this.result = error;
          this.isLoading = false;
        }, 5000);
      }
    );
  }
}
