import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private subject = new Subject<any>();
  $pagination = this.subject.asObservable();
  constructor() { }

  setPagination(range: any) {
    this.subject.next(range);
  }
}
