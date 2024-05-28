import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private baseUrl = 'http://localhost:8080/api/v1/pdfs';


  constructor(private http: HttpClient) { }

  getPdfUrl(key: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/get-pdf-url?objectName=${key}`, { responseType: 'text' as 'json' });
  }
}
