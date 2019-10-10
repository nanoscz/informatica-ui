import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  public baseUrl = "http://localhost:3000/v1"
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/personal`
  }

  findAll() {
    return this.http.get(this.baseUrl)
      .toPromise()
      .catch(this.handleError);
  }

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  register(personal: any) {
    return this.http.post(this.baseUrl, personal)
      .toPromise()
      .catch(this.handleError);
  }

  update(id: number, personal: any) {
    this.http.patch(`${this.baseUrl}/${id}`, personal)
      .toPromise()
      .catch(this.handleError);
  }

  delete(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }
  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
