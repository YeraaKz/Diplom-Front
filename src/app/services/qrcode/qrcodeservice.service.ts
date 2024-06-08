import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateInfoDTO} from "../certificate/сertificateInfoDTO";

@Injectable({
  providedIn: 'root'
})
export class QrcodeserviceService {

  private apiUrl = 'http://localhost:8080/api/v1/qrcode/image';

  constructor(private http: HttpClient) { }

  getQRCodeUrl(link: string): Observable<string> {

    const body = {
      link: link
    };

    return this.http.post<string>(this.apiUrl, body, { responseType: 'text' as 'json' });
  }

}
