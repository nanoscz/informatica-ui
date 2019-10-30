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
  public title = 'Personals';
  public dataReceived: any = {
    personals: [],
    count: 0
  };
  public loading = true;
  public $subscription: Subscription;

  public term = '';
  public limit = 10;
  public offset = 0;
  constructor(
    public dialog: MatDialog,
    private observerService: ObserverService,
    private personalService: PersonalService
  ) { }

  ngOnInit() {
    this.$subscription = this.observerService.$observer
      .subscribe(dataReceived => {
        if (dataReceived.type === 'personal') {
          this.dataReceived.personals.push(dataReceived.data);
          this.dataReceived.count += 1;
        }
      });
    this.getPersonal();
  }

  getPersonal(text: string = '') {
    this.offset = 0;
    this.personalService.findAll(text, `${this.offset}-${this.limit}`)
      .then(dataReceived => {
        this.dataReceived = dataReceived;
        this.loading = false;
      })
      .catch(this.handleError.bind(this));
  }

  getMorePersonal() {
    this.offset += 10;
    this.personalService.findAll(this.term, `${this.offset}-${this.limit}`)
      .then((dataReceived: any) => {
        for (const personal of dataReceived.personals) {
          this.dataReceived.personals.push(personal);
        }
        this.loading = false;
      })
      .catch(this.handleError.bind(this));
  }

  search(term: string) {
    this.term = term;
    if (term.length >= 1) {
      this.getPersonal(term);
    }
    if (term.length === 0 || term === '') {
      this.getPersonal();
    }
  }

  edit(personal: any, index: number) {
    const dialogRef = this.dialog.open(FormPersonalComponent, {
      width: '400px',
      data: {
        title: `Modificar Personal`,
        action: 'edit',
        personal
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataReceived.personals[index] = data;
      }
    });
  }

  delete(id: number, index: number) {
    this.personalService.delete(id)
      .then(() => {
        this.dataReceived.personals.splice(index, 1);
        this.dataReceived.count -= 1;
      })
      .catch(this.handleError.bind(this));
  }

  handleError(err: any): Promise<any> {
    this.loading = false;
    return Promise.reject(err.error);
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}
