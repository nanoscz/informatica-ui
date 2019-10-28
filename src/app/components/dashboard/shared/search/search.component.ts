import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() size: number;
  @Output() event = new EventEmitter();
  public term: string;
  constructor() {
  }

  ngOnInit() {}

  search($event) {
    const value: string = $event.target.value.trim();
    this.event.emit(value);
  }

  clear() {
    this.term = '';
    this.event.emit(this.term);
  }
}
