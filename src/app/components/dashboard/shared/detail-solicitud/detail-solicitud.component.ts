import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';
import { AsignarService } from '../../services/asignar.service';

@Component({
  selector: 'app-detail-solicitud',
  templateUrl: './detail-solicitud.component.html',
  styleUrls: ['./detail-solicitud.component.scss']
})
export class DetailSolicitudComponent implements OnInit {
  public form: FormGroup;
  public modeEdit: boolean = false;
  public personals: any = []
  public assignedPersonal: any = []
  public textNotAssigned = 'No se le ha asignado un personal a esta solicitud.'
  constructor(
    private asignarService: AsignarService,
    private perosnalService: PersonalService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetailSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      personals: ''
    })
    this.getPersonal()
    this.getAssignedPersonal()
  }

  getPersonal() {
    this.perosnalService.findAll('', '0-100')
      .then((dataReceived: any) => {
        this.personals = dataReceived.personals
      })
      .catch(err => console.log(err))
  }

  getAssignedPersonal(){
    const solicitudId = this.data.solicitud.id;
    this.asignarService.findBySolicitud(solicitudId)
      .then((dataReceived:any)=>{
        this.assignedPersonal = dataReceived.assignedPersonal
        const assigned = this.assignedPersonal.map((personal: any) => personal.id)
        this.form.controls.personals.setValue(assigned)
      })
      .catch(err => console.log(err))
  }

  changeMode() {
    this.modeEdit = !this.modeEdit;
  }

  filterData(firstArray, secondArray) {
    return firstArray.filter((item:any) => secondArray.indexOf(item) == -1)
  }

  formatData(firstArray) {
    const solicitudId = this.data.solicitud.id;
    const asignar = firstArray.map((personalId: number) => {
      return {
        solicitudId,
        personalId
      }
    })
    return asignar
  }

  submit() {
    const { personals } = this.form.value;
    const assigned = this.assignedPersonal.map(item => item.id)
    if (personals.length === 0 && assigned.length === 0) {
      return
    }
    let personalFilter = []
    let asignar = []
    if(personals.length >= assigned.length) {
      personalFilter =  this.filterData(personals, assigned)
      asignar = this.formatData(personalFilter)
      this.asignarService.create(asignar)
        .then(() => {
          this.getAssignedPersonal()
          this.changeMode()
        })
        .catch(err => console.log(err))
    } else {
      let PromiseArray = []
      personalFilter =  this.filterData(assigned, personals)
      asignar = this.formatData(personalFilter)
      for (const a of asignar) {
        let deleteAssign = this.asignarService.delete(a.solicitudId, a.personalId)
        PromiseArray.push(deleteAssign)
      }
      Promise.all(PromiseArray)
        .then(()=> {
          this.getAssignedPersonal()
          this.changeMode()
        })
        .catch(err => console.log(err))
    }
  }

}
