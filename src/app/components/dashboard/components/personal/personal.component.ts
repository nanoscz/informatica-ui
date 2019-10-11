import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ObserverService } from '../../services/observer.service';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../../shared/form/form.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {
  public search = '';
  public personals = [];
  public loading = true;
  public $subscription: Subscription;
  constructor(
    public dialog: MatDialog,
    private observerServicio: ObserverService,
    private personalService: PersonalService
    ) { }

  async ngOnInit() {
    this.$subscription = this.observerServicio.$observador.subscribe(personal => {
      this.personals.push(personal);
    });
    this.personals = await this.personalService.findAll();
    this.loading = false;
  }

  ngOnDestroy(): void {
  this.$subscription.unsubscribe();
  }

  editar(personal: any, index: number) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: {
        title: `Modificar Personal`,
        action: 'modificar',
        personal: personal
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(personal => {
      this.personals[index] = personal
    });
  }

  eliminar(id: number, index: number) {
    this.personalService.delete(id)
    .then(()=> {
      this.personals.splice(index, 1)
    })
    .catch(this.handleError)
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
