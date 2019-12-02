import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { handlerErrorPromise } from '../../../utils/handler-errors';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignarService {
  private baseUrl = environment.endpoints;
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/asignar`;
  }

  create(asignar: any) {
    return this.http.post(this.baseUrl, asignar)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  findBySolicitud(id: number) {
    return this.http.get(`${this.baseUrl}/solicitud/${id}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  delete(solicitudId: number, personalId: number) {
    return this.http.delete(`${this.baseUrl}/solicitud/${solicitudId}/personal/${personalId}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }
}
