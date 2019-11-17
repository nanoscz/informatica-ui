import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { handlerErrorPromise } from '../utils/handler-errors';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:3000/v1';
  constructor(private http: HttpClient) {
    this.baseUrl = `${this.baseUrl}/image`;
  }

  findOne(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  register(image: any) {
    return this.http.post(this.baseUrl, image)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  update(image: any, userId: number) {
    return this.http.patch(`${this.baseUrl}/${userId}`, image)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  delete(userId: number) {
    return this.http.delete(`${this.baseUrl}/${userId}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }
}
