import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ObserverService } from './services/observer.service';

import { FormPersonalComponent } from './shared/form-personal/form-personal.component';
import { FormSolicitudComponent } from './shared/form-solicitud/form-solicitud.component';
import { SolicitudService } from './services/solicitud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  title: string;
  text: string;
  menus: any;
  classSidebar: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private observerService: ObserverService,
    private solicitudService: SolicitudService,
    private storageService: StorageService
  ) {
    /** Settings Storage */
    const settings: any = this.storageService.getData('settings');
    this.title = settings.title;
    this.menus = settings.menus;

    this.router.events.subscribe((event: ActivationEnd) => {
      if (event instanceof ActivationEnd && event.snapshot.firstChild == null) {
        if (event.snapshot.data.title) {
          this.text = event.snapshot.data.title;
        } else {
          this.text = settings.pages.solicitud.title;
        }
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['login']);
    this.storageService.clear();
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
    if (!this.router.url.includes('solicitud')) {
      this.router.navigate(['dashboard/solicitud']);
      this.solicitudService.term = term.trim();
    }
    if (term.length === 0) {
      this.solicitudService.term = term.trim();
    }
    this.observerService.sendData('search', term.trim());
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
