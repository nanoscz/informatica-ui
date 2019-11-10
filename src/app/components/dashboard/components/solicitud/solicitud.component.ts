import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObserverService } from '../../services/observer.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit, OnDestroy {
  public title: string;
  public tabs: any;
  public offset: number;
  public limit: number;
  public total: number;
  public count: number;
  public range: string;
  public $observerSubscription: Subscription;
  constructor(
    private observerService: ObserverService,
    private storageService: StorageService,
    private router: Router
  ) {
    /** Settings Storage */
    const settings: any = this.storageService.getData('settings');
    this.title = settings.pages.solicitud.title;
    this.tabs = settings.pages.solicitud.tabs;
    this.offset = settings.pagination.offset;
    this.limit = settings.pagination.limit;
    /** Set tabsIndex */
    const url = this.router.url.split('/');
    const tabsIndex = parseInt(url[url.length - 1], 10);
    this.setActiveTabs(tabsIndex);

    this.$observerSubscription = this.observerService.$observer
      .subscribe(dataReceived => {
        if (dataReceived.type === 'range') {
          this.count = dataReceived.data.count;
          const range = dataReceived.data.range.split('-');
          this.offset = parseInt(range[0], 10);
          const limit = parseInt(range[1], 10);
          this.total = this.offset + limit;
          if (this.count < limit) {
            this.total = this.count;
          }
          this.range = `${this.offset}-${this.total}`;
        }
      });
  }

  ngOnInit() { }

  setPage(offset: number) {
    this.observerService.sendData('pagination', offset);
  }

  goTab(tab) {
    const offset = this.offset * -1;
    this.setPage(offset);
    this.setActiveTabs(tab.id);
  }

  setActiveTabs(tabsIndex) {
    this.tabs.map(item => item.isActive = item.id === tabsIndex ? true : false);
  }

  ngOnDestroy(): void {
    this.$observerSubscription.unsubscribe();
  }
}
