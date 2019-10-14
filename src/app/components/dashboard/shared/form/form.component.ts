import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';
import { ObserverService } from '../../services/observer.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('f', { static: false }) myNgForm;

  public loading = false;
  public form: FormGroup;
  public servicios = [];
  public txtSubmit = '';
  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private observerServicio: ObserverService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.servicios = [
      { id: 1, nombre: 'sistemas', pref: 'ing' },
      { id: 2, nombre: 'redes y telecomunicaciones', pref: 'ing' },
      { id: 3, nombre: 'servicio tecnico', pref: 'tec' },
      { id: 4, nombre: 'archivo', pref: 'arch' },
      { id: 5, nombre: 'secretaria', pref: 'sec'},
    ];
  }

  ngOnInit() {
    this.txtSubmit = this.data.action === 'registrar' ?  'Guardar' : 'Modificar';
    this.form = this.fb.group({
      nom: ['', [Validators.required]],
      app: ['', [Validators.required]],
      apm: ['', [Validators.required]],
      servicio: ['', [Validators.required]]
    });
    if (this.data.action === 'modificar') {
      this.form.setValue({
        nom: this.data.personal.nom,
        app: this.data.personal.app,
        apm: this.data.personal.apm,
        servicio: this.data.personal.servicio
      });
    }
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    const personal = Object.assign({}, this.form.value);
    this.loading = true;
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

  modificar(personal: any) {
    this.personalService.update(personal, this.data.personal.id)
    .then(() => {
      this.loading = false;
      this.dialogRef.close(personal);
    })
    .catch(this.handleError);
  }

  guardar(personal: any) {
    const servicio = this.servicios.filter(item => item.id === personal.servicio);
    personal.pref = servicio[0].pref;
    personal.cargo = '';
    this.personalService.register(personal)
    .then(data => {
      this.loading = false;
      this.observerServicio.enviarDatos(data);
      this.myNgForm.resetForm();
    })
    .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
