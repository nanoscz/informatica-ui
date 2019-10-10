import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public search = '';
  public personals = []
  public loading = true
  constructor(private personalService: PersonalService) { }

  async ngOnInit() {
    this.personals = await this.personalService.findAll()
    this.loading = false
  }

  editar(id: number){
    console.log(id)
  }

  eliminar(id: number){
    console.log(id)
  }
}
