import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ObserverService } from './services/observer.service';

import { FormPersonalComponent } from './shared/form-personal/form-personal.component';
import { FormSolicitudComponent } from './shared/form-solicitud/form-solicitud.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  title = 'Informatica';
  text = '';
  menus: any;
  classSidebar: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private observerService: ObserverService
  ) {
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
    ];
    this.router.events.subscribe((event: ActivationEnd) => {
      if (event instanceof ActivationEnd && event.snapshot.firstChild == null) {
        this.text = event.snapshot.data.title;
      }
    });
  }

  ngOnInit() {
  }

  register(component: string) {
    const form = {
      solicitud: FormSolicitudComponent,
      personal: FormPersonalComponent
    };
    const formComponent = form[component];
    if (formComponent) {
      const dialogRef = this.dialog.open(formComponent, {
        width: '400px',
        data: {
          title: `register ${component}`,
          action: 'register'
        },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Register:close');
      });
    }
  }

  search(term: string) {
    this.observerService.sendData('search', term);
  }
  ngAfterViewInit() {
    this.classSidebar = this.sidebar.nativeElement.classList;
    const mainSize = this.main.nativeElement.offsetWidth;
    if (mainSize < 678) {
      this.classSidebar.add('no-menu');
    }
  }

  showMenu() {
    if (Object.values(this.classSidebar).includes('no-menu')) {
      this.classSidebar.remove('no-menu');
    } else {
      this.classSidebar.add('no-menu');
    }
  }
}
