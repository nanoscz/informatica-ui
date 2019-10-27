import { Component, OnInit, OnDestroy } from '@angular/core';
import { Solicituds } from '../../interfaces/interfaces';
import { SolicitudService } from '../../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { ObserverService } from '../../services/observer.service';
import { PaginationService } from '../../services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public $paginationSubscription: Subscription;
  public $searchSubscription: Subscription;
  public $observerSubscription: Subscription;
  public tabsIndex: number;
  public dataReceived: Solicituds = {
    solicituds: [],
    count: 0
  }
  public offset: number = 0
  public limit: number = 10
  public range: string
  public term: string = '';
  constructor(
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private observerService: ObserverService,
    private paginationService: PaginationService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.tabsIndex = params.id;
      this.setRange(0)
      this.getSolicitud()
    });
  }

  ngOnInit() {
    this.$paginationSubscription = this.paginationService.$pagination
      .subscribe(
        offset => {
          this.setRange(offset)
          this.getSolicitud()
        },
        error => console.error(error)
      )
    this.$searchSubscription = this.observerService.$search
      .subscribe(
        term => {
          this.term = term
          this.getSolicitud()
        },
        err => console.error(err)
      )
    this.$observerSubscription = this.observerService.$observador
      .subscribe(
        received => {
          if(received.type === 'solicitud') {
            this.getSolicitud()
          }
        },
        err => console.error(err)
      )
  }

  setRange(offset) {
    this.offset += offset
    if (this.offset >= 0) {
      this.range = `${this.offset}-${this.limit}`
    } else {
      this.offset = 0
    }
  }

  getSolicitud() {
    this.solicitudService.findAll(this.tabsIndex, this.term, this.range)
      .subscribe(
        (dataReceived: Solicituds) => {
          this.dataReceived.solicituds = dataReceived.solicituds
          this.dataReceived.count = dataReceived.count
          this.observerService.enviarDatos('range', {
            count: this.dataReceived.count,
            range: this.range
          })
        },
        err => this.handlerError(err)
      )
  }

  check(id: number) {
    console.log("modificar", id)
  }

  modificar(id: number) {
    console.log("modificar", id)
  }

  eliminar(id: number) {
    console.log("eliminar", id)
  }

  handlerError(err) {
    return Promise.reject(err)
  }

  ngOnDestroy(): void {
    this.$paginationSubscription.unsubscribe()
    this.$searchSubscription.unsubscribe()
  }

}
