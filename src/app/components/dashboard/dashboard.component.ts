import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './shared/form/form.component';

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
    private router: Router
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
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: {
        title: `Registrar ${component}`,
        action: 'registrar',
        personal: {
          nom: '',
          app: '',
          apm: '',
          servicio: 1,
          pref: '',
          cargo: ''
        }
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log('Register:close');
    });
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
