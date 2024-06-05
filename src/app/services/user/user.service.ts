import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import {UserRequest} from './user-request';
import {UserUpdateDTO} from './user-update.dto';
import {environment} from "../../../environment/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.userUrl;
  private pmUrl = environment.pmUrl;
  private adminUrl = environment.adminUrl;
  private allUrl = environment.allUrl;
  private allUserUrl = environment.allUserUrl;
  private delete = environment.delete;
  private addUser = environment.addUser;
  private uploadUrl = environment.uploadUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, {  responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {  responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {  responseType: 'text' });
  }

  getAllBoard(): Observable<string> {
    return this.http.get(this.allUrl, {  responseType: 'text' });
  }

  getAllUsers(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(this.allUserUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.delete + `/${id}`);
  }

  saveUser(userUpdateDTO: UserUpdateDTO): Observable<any> {
    return this.http.post(this.addUser, userUpdateDTO);
  }

  getUserImage(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/image`, { responseType: 'text' as 'json' });
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Опционально, если нужно добавить заголовки
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    // Отправка данных
    return this.http.post(this. uploadUrl, formData, { headers });
  }
}
