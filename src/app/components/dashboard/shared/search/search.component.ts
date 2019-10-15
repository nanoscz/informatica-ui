import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() size: number;
  @Output() evento = new EventEmitter()
  public search: string;
  constructor() { 
  }
  
  ngOnInit() {}

  buscar($event) {
    let valor: string = $event.target.value.trim()
    this.evento.emit(valor)
  }

  clear() {
    this.search = ''
    this.evento.emit(this.search)
  }
}
