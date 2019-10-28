import { Component, OnInit, OnDestroy } from '@angular/core';
import { Solicituds } from '../../interfaces/interfaces';
import { SolicitudService } from '../../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { ObserverService } from '../../services/observer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public $observerSubscription: Subscription;
  public tabsIndex: number;
  public dataReceived: Solicituds = {
    solicituds: [],
    count: 0
  };
  public offset = 0;
  public limit = 10;
  public range: string;
  public term = '';
  constructor(
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private observerService: ObserverService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.tabsIndex = params.id;
      this.setRange(0);
      this.getSolicitud();
    });
  }

  ngOnInit() {
    this.$observerSubscription = this.observerService.$observer
      .subscribe(
        dataReceived => {
          switch (dataReceived.type) {
            case 'search':
              this.term = dataReceived.data;
              break;
            case 'pagination':
              this.setRange(dataReceived.data);
              break;
          }
          this.getSolicitud();
        },
        err => console.error(err)
      );
  }

  setRange(offset) {
    this.offset += offset;
    if (this.offset >= 0) {
      this.range = `${this.offset}-${this.limit}`;
    } else {
      this.offset = 0;
    }
  }

  getSolicitud() {
    this.solicitudService.findAll(this.tabsIndex, this.term, this.range)
      .subscribe(
        (dataReceived: Solicituds) => {
          this.dataReceived.solicituds = dataReceived.solicituds;
          this.dataReceived.count = dataReceived.count;
          this.observerService.sendData('range', {
            count: this.dataReceived.count,
            range: this.range
          });
        },
        err => this.handlerError(err)
      );
  }

  check(id: number) {
    console.log('modificar', id);
  }

  edit(id: number) {
    console.log('modificar', id);
  }

  delete(id: number) {
    console.log('eliminar', id);
  }

  handlerError(err) {
    return Promise.reject(err);
  }

  ngOnDestroy(): void {
    this.$observerSubscription.unsubscribe();
  }

}
