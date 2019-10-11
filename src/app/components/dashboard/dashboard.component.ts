import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './shared/form/form.component';
import { ObserverService } from './services/observer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  title = 'Informatica';
  text = '';
  menus: any;
  classSidebar: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private observerServicio: ObserverService,
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
    ]
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const transform = event.url.split('/')
        this.text = transform[transform.length - 1]
      }
    });
  }

  ngOnInit() {
  }

  register(component: string) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: {
        title: `Registrar ${component}`,
        action: 'registrar',
        personal: {
          nom: 'Fernando',
          app: 'Castillo',
          apm: 'Torrico',
          servicio: 1,
          pref: '',
          cargo: ''
        }
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.observerServicio.enviarDatos(result)
    });
  }

  ngAfterViewInit() {
    this.classSidebar = this.sidebar.nativeElement['classList'];
    const mainSize = this.main.nativeElement.offsetWidth;
    if (mainSize < 678) {
      this.classSidebar.add('no-menu')
    }
  }

  showMenu() {
    if (Object.values(this.classSidebar).includes('no-menu')) {
      this.classSidebar.remove('no-menu')
    } else {
      this.classSidebar.add('no-menu')
    }
  }
}
