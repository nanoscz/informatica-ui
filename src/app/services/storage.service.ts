import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  getData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**  SESSION STORAGE */

  setDataSession(key: string, data: string) {
    sessionStorage.setItem(key, data);
  }

  getDataSession(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
