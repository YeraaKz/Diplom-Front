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
  loading: boolean = false;

  constructor(private cryptoService: CryptoService) { }

  onSubmit(): void {
    this.loading = true;
    this.result = null;
    this.cryptoService.checkCrypto(this.cryptoName).subscribe(
      data => {
        setTimeout(() => {
          this.result = data;
          this.loading = false;
        }, 5000);
      },
      error => {
        setTimeout(() => {
          this.result = error;
          this.loading = false;
        }, 5000);
      }
    );
  }
}
