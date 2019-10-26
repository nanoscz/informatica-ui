import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObserverService } from '../../services/observer.service';
import { Subscription } from 'rxjs';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit, OnDestroy {
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
  public offset: number
  public total: number
  public count: number
  public range: string
  public $subscription: Subscription;
  constructor(
    private observerService: ObserverService,
    private paginationService: PaginationService
    ) {
    this.$subscription = this.observerService.$observador.subscribe(datos => {
      this.count = datos.count
      let range = datos.range.split('-')
      this.offset = parseInt(range[0], 10)
      const limit = parseInt(range[1], 10)
      this.total = this.offset + limit
      this.range = `${this.offset}-${this.total}`
    });
  }

  ngOnInit() { }

  setPage(offset: number) {
    this.paginationService.setPagination(offset)
  }

  irTab(tab) {
    const offset = this.offset * -1
    this.setPage(offset)
    this.tabs.map(item => item.isActive = item.id === tab.id ? true : false)
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}