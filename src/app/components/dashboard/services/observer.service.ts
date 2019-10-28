import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private subject = new Subject<any>();
  private searchObserver = new Subject<any>();
  $observer = this.subject.asObservable();

  $search = this.searchObserver.asObservable();
  constructor() { }

  sendData(type: string, data: any) {
    this.subject.next({type, data});
  }

  sendSearch(term: string) {
    this.searchObserver.next(term);
  }
}
