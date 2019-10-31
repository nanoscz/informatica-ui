import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { handlerErrorPromise } from '../../../errors/error';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  public baseUrl = 'http://localhost:3000/v1';
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/solicitud`;
  }

  findAll(type: number, search: string = '', range: string = '0-50') {
    const params = new HttpParams()
      .set('search', search)
      .set('range', range);
    return this.http.get(`${this.baseUrl}/${type}/all`, { params });
  }

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  register(personal: any) {
    return this.http.post(this.baseUrl, personal)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  update(personal: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, personal)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }
}
