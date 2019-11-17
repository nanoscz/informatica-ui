import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { handlerErrorPromise } from '../utils/handler-errors';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public baseUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) {
  }

  getImage(image: string) {
    return this.http.get(`${this.baseUrl}/${image}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  upload(file: File) {
    return this.http.post(`${this.baseUrl}/upload`, file)
      .toPromise()
      .catch(handlerErrorPromise);
  }
}
