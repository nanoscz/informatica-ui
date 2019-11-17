import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public baseUrl = 'http://localhost:3001/';
  constructor(private http: HttpClient) {
  }

  upload(file: File) {
    return this.http.post(`${this.baseUrl}/upload`, file)
      .toPromise()
      .catch();
  }
}
