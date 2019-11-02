import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = 'http://localhost:3000/v1';
  constructor(private http: HttpClient) {
  }

  login(credential: any) {
    return this.http.post(`${this.baseUrl}/login`, credential)
      .toPromise()
      .catch();
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/user`, user)
      .toPromise()
      .catch();
  }

  update(user: any, id: number) {
    return this.http.patch(`${this.baseUrl}/user/${id}`, user)
      .toPromise()
      .catch();
  }

}
