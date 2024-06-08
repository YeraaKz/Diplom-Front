import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificateInfoDTO} from "./сertificateInfoDTO";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private apiUrl = 'http://localhost:8080/api/v1/certificates/user-certificates';

  constructor(private http: HttpClient) { }

  getUserCertificates(): Observable<CertificateInfoDTO[]> {
    return this.http.get<CertificateInfoDTO[]>(this.apiUrl);
  }
}
