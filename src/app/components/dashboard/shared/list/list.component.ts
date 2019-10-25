import { Component, OnInit } from '@angular/core';
import { Solicituds } from '../../interfaces/interfaces';
import { SolicitudService } from '../../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tabsIndex;
  public dataReceived: Solicituds = {
    solicituds: [],
    count: 0
  }
  constructor(
    private solicitudService: SolicitudService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.tabsIndex = params.id;
      this.solicitudService.findAll(this.tabsIndex)
    .subscribe(
      (dataReceived: Solicituds) => {
      this.dataReceived.solicituds = dataReceived.solicituds
      this.dataReceived.count = dataReceived.count
    },
      err => this.handlerError(err)
    )
    });
  }

  ngOnInit() {
  }
  
  modificar(id: number) {
    console.log("modificar", id)
  }

  eliminar(id: number){
    console.log("eliminar", id)
  }

  handlerError(err) {
    return Promise.reject(err)
  }

}
