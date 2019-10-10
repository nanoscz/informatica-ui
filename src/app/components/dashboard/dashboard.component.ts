import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  title = 'cps-panel';
  menus: any;
  classSidebar: any;
  constructor() {
    this.menus = [
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
    ]
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.classSidebar = this.sidebar.nativeElement['classList'];
    const mainSize = this.main.nativeElement.offsetWidth;
    if(mainSize < 678) {
      this.classSidebar.add('no-menu')
    }
  }

  showMenu() {
    if(Object.values(this.classSidebar).includes('no-menu')) {
      this.classSidebar.remove('no-menu')
    } else {
      this.classSidebar.add('no-menu')
    }
  }
}
