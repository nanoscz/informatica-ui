import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private subject = new Subject<any>();
  $observador = this.subject.asObservable();
  constructor() { }

  enviarDatos(datos: any) {
    this.subject.next(datos);
  }
}
