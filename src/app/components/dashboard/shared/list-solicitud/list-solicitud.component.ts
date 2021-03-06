import { Component, OnInit, OnDestroy } from '@angular/core';
import { Solicituds } from '../../interfaces/interfaces';
import { SolicitudService } from '../../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { ObserverService } from '../../services/observer.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormSolicitudComponent } from '../form-solicitud/form-solicitud.component';
import { DetailSolicitudComponent } from '../detail-solicitud/detail-solicitud.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent implements OnInit, OnDestroy {
  public $observerSubscription: Subscription;
  public tabsIndex: number;
  public notData = 'Not data found';
  public dataReceived: Solicituds = {
    solicituds: [],
    count: 0
  };
  public offset: number;
  public limit: number;
  public range: string;
  public term: string;
  private settings: any;
  constructor(
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute,
    private observerService: ObserverService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {
    /** Settings Storage */
    this.settings = this.storageService.getData('settings');
    this.offset = this.settings.pagination.offset;
    this.limit = this.settings.pagination.limit;

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
              this.setRange(0, true);
              this.term = dataReceived.data;
              break;
            case 'pagination':
              this.setRange(dataReceived.data);
              break;
          }
          if (dataReceived.type !== 'range') {
            this.getSolicitud();
          }
        },
        err => console.error(err)
      );
  }

  setRange(offset: number, reset: boolean = false) {
    if (reset) {
      this.offset = this.settings.pagination.offset;
      this.limit = this.settings.pagination.limit;
    } else {
      this.offset += offset;
    }
    this.range = `${this.offset}-${this.limit}`;
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

  async changeStatus(status: number, id: number) {
    const estado = status + 1;
    await this.solicitudService.update({ estado }, id).catch(this.handlerError.bind(this));
    this.getSolicitud();
  }

  detail(solicitud: any) {
    this.dialog.open(DetailSolicitudComponent, {
      width: '800px',
      data: {
        title: `show`,
        action: 'show',
        solicitud
      },
      disableClose: true
    });
  }

  edit(solicitud: any, index: number) {
    console.log(solicitud, index);
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
        this.dataReceived.solicituds[index] = data;
      }
    });
  }

  async delete(id: number) {
    await this.solicitudService.delete(id).catch(this.handlerError.bind(this));
    this.getSolicitud();
  }

  handlerError(err) {
    return Promise.reject(err);
  }

  ngOnDestroy(): void {
    this.$observerSubscription.unsubscribe();
  }

}
