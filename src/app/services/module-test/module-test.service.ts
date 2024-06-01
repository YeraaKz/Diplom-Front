import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestResultResponse} from "../test/test-result-response";

@Injectable({
  providedIn: 'root'
})
export class ModuleTestService {

  private apiUrl = 'http://localhost:8080/api/v1/module-tests';

  constructor(private http: HttpClient) { }

  getModuleTest(testId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${testId}`);
  }

  submitTestResults(testId: number, submission: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${testId}`, submission);
  }


}
