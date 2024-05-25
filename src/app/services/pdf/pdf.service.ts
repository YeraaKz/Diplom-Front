import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  getPdfUrl(key: string): Observable<string> {
    return this.http.get(`http://localhost:8080/api/v1/courses/pdfs/get-pdf-url?objectName=${key}`, { responseType: 'text' });
  }
}
