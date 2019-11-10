import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getDefaultSettings() {
    return {
      title: 'Informatica',
      menus: [
        {
          title: 'Hoja de rutas',
          icon: 'folder-open',
          submenu: [],
          links: 'solicitud'
        },
        {
          title: 'Reportes',
          icon: 'pie-chart',
          submenu: [],
          links: 'reportes'
        },
        {
          title: 'Personal',
          icon: 'users',
          submenu: [],
          links: 'personal'
        }
      ],
      pages: {
        solicitud: {
          title: 'Solicitud',
          subtitle: 'Sub Title Solicitud',
          tabs: [
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
        }
      },
      pagination: {
        offset: 0,
        limit: 50
      }
    };
  }
}
