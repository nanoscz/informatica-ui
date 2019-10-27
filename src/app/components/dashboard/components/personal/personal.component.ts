import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ObserverService } from '../../services/observer.service';
import { MatDialog } from '@angular/material';
import { FormPersonalComponent } from '../../shared/form-personal/form-personal.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {
  public title = 'Personals'
  public dataReceived: any = {
    personals: [],
    count: 0
  }
  public loading: boolean = true
  public $subscription: Subscription;

  public term: string = ''
  public limit: number = 10
  public offset: number = 0
  constructor(
    public dialog: MatDialog,
    private observerServicio: ObserverService,
    private personalService: PersonalService
    ) { }

  ngOnInit() {
    this.$subscription = this.observerServicio.$observador.subscribe(received => {
      this.dataReceived.personals.push(received.datos);
      this.dataReceived.count += 1
    });
    this.getPersonal()
  }

  getPersonal(text: string = '') {
    this.offset = 0;
    this.personalService.findAll(text, `${this.offset}-${this.limit}`)
      .then(dataReceived => {
        this.dataReceived = dataReceived;
        this.loading = false;
      })
      .catch(this.handleError.bind(this))
  }

  getMorePersonal() {
    this.offset += 10;
    this.personalService.findAll(this.term, `${this.offset}-${this.limit}`)
      .then((dataReceived: any) => {
        for (const personal of dataReceived.personals) {
          this.dataReceived.personals.push(personal)
        }
        this.loading = false;
      })
      .catch(this.handleError.bind(this))
  } 

  buscar(text: string) {
    this.term = text;
    if(text.length >= 1){
      this.getPersonal(text)
    }
    if(text.length === 0 || text === ''){
      this.getPersonal()
    }
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  editar(personal: any, index: number) {
    const dialogRef = this.dialog.open(FormPersonalComponent, {
      width: '400px',
      data: {
        title: `Modificar Personal`,
        action: 'modificar',
        personal
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataReceived.personals[index] = data;
      }
    });
  }

  eliminar(id: number, index: number) {
    this.personalService.delete(id)
    .then(() => {
      this.dataReceived.personals.splice(index, 1);
      this.dataReceived.count -= 1
    })
    .catch(this.handleError.bind(this));
  }

  handleError(err: any): Promise<any> {
    this.loading = false;
    return Promise.reject(err.error);
  }
}
