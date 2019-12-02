import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { handlerErrorPromise } from '../../../utils/handler-errors';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemitenteService {
  private baseUrl = environment.endpoints;
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/remitente`;
  }

  findAll(search: string, range: string = '0-500') {
    const params = new HttpParams()
      .set('search', search)
      .set('range', range);
    return this.http.get(this.baseUrl, { params })
      .toPromise()
      .catch(handlerErrorPromise);
  }

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  register(remitente: any) {
    return this.http.post(this.baseUrl, remitente)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  update(remitente: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, remitente)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }
}
