import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public loading = false;
  public form: FormGroup;
  public servicios = [];
  public txtSubmit = '';
  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.servicios = [
      { id: 1, nombre: 'sistemas', pref: 'ing' },
      { id: 2, nombre: 'redes y telecomunicaciones', pref: 'ing' },
      { id: 3, nombre: 'servicio tecnico', pref: 'tec' },
      { id: 4, nombre: 'archivo', pref: 'archivo' },
      { id: 5, nombre: 'secretaria', pref: 'sec'},
    ];
  }

  ngOnInit() {
    this.txtSubmit = this.data.action === 'registrar' ?  'Guardar' : 'Modificar';
    this.form = this.fb.group({
      nom: [this.data.personal.nom, [Validators.required]],
      app: [this.data.personal.app, [Validators.required]],
      apm: [this.data.personal.apm, [Validators.required]],
      servicio: [this.data.personal.servicio, [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      const personal = Object.assign({}, this.form.value);
      const servicio = this.servicios.filter(item => item.id === personal.servicio);
      personal.pref = servicio[0].pref;
      personal.cargo = '';
      switch (this.data.action) {
        case 'registrar':
            this.guardar(personal);
            break;
        case 'modificar':
            this.modificar(personal);
            break;
        default:
          console.log('Fatal Error');
          break;
      }
    }
  }

  modificar(personal: any) {
    this.personalService.update(personal, this.data.personal.id)
    .then(() => {
      this.loading = false;
      this.dialogRef.close(personal);
    })
    .catch(this.handleError);
  }

  guardar(personal: any) {
    this.personalService.register(personal)
    .then(data => {
      this.loading = false;
      this.dialogRef.close(data);
    })
    .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
