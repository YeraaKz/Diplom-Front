import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {NewsDTO} from "./newsDTO";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = environment.newsUrl;

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<NewsDTO[]> {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }

  getNewsById(id: number): Observable<NewsDTO> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
