import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private baseUrl = environment.pdf_baseUrl;


  constructor(private http: HttpClient) { }

  getPdfUrl(key: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/get-pdf-url?objectName=${key}`, { responseType: 'text' as 'json' });
  }
}
