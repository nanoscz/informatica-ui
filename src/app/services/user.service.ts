import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.endpoints;
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
