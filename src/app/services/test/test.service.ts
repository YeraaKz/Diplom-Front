import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TestResultResponse} from './test-result-response';
import {environment} from "../../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = environment.test_baseUrl;

  constructor(private http: HttpClient) { }

  getTest(testId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${testId}`);
  }

  submitTest(testSubmission: { testId: number; answers: { questionId: number; selectedOptionId: number }[] }): Observable<any> {
    return this.http.post<TestResultResponse>(`${this.apiUrl}/submit`, testSubmission);
  }
}
