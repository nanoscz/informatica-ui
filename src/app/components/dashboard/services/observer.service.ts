import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private observer = new Subject<any>();
  private searchObserver = new Subject<any>();
  $observador = this.observer.asObservable();
  
  $search = this.searchObserver.asObservable();
  constructor() { }

  enviarDatos(datos: any) {
    this.observer.next(datos);
  }

  sendSearch(term: string) {
    this.searchObserver.next(term)
  }
}
