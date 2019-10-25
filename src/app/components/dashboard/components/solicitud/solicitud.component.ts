import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  public title = 'Solicitud'
  public tabs = [
    {
      id: 1,
      isActive: true,
      name: 'Pendientes',
      icon: 'tags'
    },
    {
      id: 2,
      isActive: false,
      name: 'En progreso',
      icon: 'cogs'
    },
    {
      id: 3,
      isActive: false,
      name: 'Realizadas',
      icon: 'check-circle'
    }
  ]
  constructor() { }

  ngOnInit() { }

  irTab(tab) {
    this.tabs.map(item => item.isActive = item.id === tab.id ? true : false)
  }
}