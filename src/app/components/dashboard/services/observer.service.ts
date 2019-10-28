import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private subject = new Subject<any>();
  $observer = this.subject.asObservable();
  constructor() { }

  sendData(type: string, data: any) {
    this.subject.next({type, data});
  }
}
