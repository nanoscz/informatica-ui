import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { handlerErrorPromise } from '../utils/handler-errors';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public baseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) {
  }

  getImage(image: string) {
    return this.http.get(`${this.baseUrl}/${image}`)
      .toPromise()
      .catch(handlerErrorPromise);
  }

  upload(file: File, userId: any) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('sampleFile', file);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      const urlUpload = `${this.baseUrl}/upload`;
      xhr.open('POST', urlUpload, true);
      xhr.setRequestHeader('user_id', userId);
      xhr.send(formData);
    });
  }
}
