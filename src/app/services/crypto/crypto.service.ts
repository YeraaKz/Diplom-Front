import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins';

  constructor(private http: HttpClient) { }

  checkCrypto(cryptoName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cryptoName.toLowerCase()}`).pipe(
      map(response => {
        if (response) {
          const { id, symbol, name, description, links, genesis_date, market_data, developer_data } = response;

          let status = 'Legitimate';
          let message = 'This cryptocurrency appears to be legitimate.';

          // Дополнительные проверки
          if (!description.en || !links.homepage[0]) {
            status = 'Suspect';
            message = 'This cryptocurrency lacks a description or official homepage.';
          } else if (market_data.current_price.usd < 0.01) {
            status = 'Suspect';
            message = 'This cryptocurrency has a very low value.';
          } else if (developer_data.pull_requests_merged < 10) {
            status = 'Suspect';
            message = 'This cryptocurrency has low development activity.';
          }

          return { status, message, data: { id, symbol, name } };
        } else {
          return { status: 'Unknown', message: 'No data available for this cryptocurrency.' };
        }
      }),
      catchError(error => {
        return throwError(() => ({
          status: 'Scam',
          message: 'Cryptocurrency not found or invalid'
        }));
      })
    );
  }
}
