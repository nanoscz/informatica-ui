import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalService } from '../../services/personal.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ObserverService } from '../../services/observer.service';

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

  editar(id: number) {
    
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
