import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemitenteService {
  public baseUrl = 'http://localhost:3000/v1';
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/remitente`;
  }

  findAll(search: string, range: string = '0-500') {
    const params = new HttpParams()
      .set('search', search)
      .set('range', range);
    return this.http.get(this.baseUrl, { params })
      .toPromise()
      .catch(this.handleError);
  }

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  register(remitente: any) {
    return this.http.post(this.baseUrl, remitente)
      .toPromise()
      .catch(this.handleError);
  }

  update(remitente: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, remitente)
      .toPromise()
      .catch(this.handleError);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
