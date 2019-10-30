import { Component, OnInit, OnDestroy } from '@angular/core';
import { Solicituds } from '../../interfaces/interfaces';
import { SolicitudService } from '../../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { ObserverService } from '../../services/observer.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormSolicitudComponent } from '../form-solicitud/form-solicitud.component';

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
    private observerService: ObserverService,
    public dialog: MatDialog
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
           default:
              break;
          }
          if (dataReceived.type !== 'range') {
            this.getSolicitud();
          }
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

  async changeStatus(status: number ,id: number) {
    const estado = status + 1;
    await this.solicitudService.update({estado: estado}, id).catch(this.handlerError.bind(this))
    this.getSolicitud()
  }

  edit(solicitud: any, index: number) {
    console.log(solicitud, index)
    const dialogRef = this.dialog.open(FormSolicitudComponent, {
      width: '400px',
      data: {
        title: `edit`,
        action: 'edit',
        solicitud
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('Edit:close', data);
      if (data) {
        this.dataReceived.solicituds[index] = data
      }
    });
  }

  async delete(id: number) {
    await this.solicitudService.delete(id).catch(this.handlerError.bind(this))
    this.getSolicitud()
  }

  handlerError(err) {
    return Promise.reject(err);
  }

  ngOnDestroy(): void {
    this.$observerSubscription.unsubscribe();
  }

}
