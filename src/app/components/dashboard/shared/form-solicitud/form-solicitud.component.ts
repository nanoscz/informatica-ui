import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { RemitenteService } from '../../services/remitente.service';
import { SolicitudService } from '../../services/solicitud.service';
import { ObserverService } from '../../services/observer.service';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.scss']
})
export class FormSolicitudComponent implements OnInit {
  @ViewChild('f', { static: false }) myNgForm;
  public loading = false;
  public selectedIndex = 0;
  public txtSubmit = '';
  public form: FormGroup;
  public remitentes: any[] = [];
  constructor(
    private fb: FormBuilder,
    private remitenteService: RemitenteService,
    private solicitudServicie: SolicitudService,
    private observerServicio: ObserverService,
    public dialogRef: MatDialogRef<FormSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
      cite: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      remitente: [null, [Validators.required, this.isValidRemitente]],
    });
    this.form.controls.remitente.valueChanges
      .subscribe((value: string) => {
        if (value !== null && value.length >= 4) {
          this.remitenteService.findAll(value)
            .then((results: any) => {
              this.remitentes = results.remitentes;
            })
            .catch(this.handlerError.bind(this));
        }
      });
    this.txtSubmit = this.data.action === 'register' ? 'Guardar' : 'Modificar';
    this.setDate();
    if (this.data.action === 'edit') {
      this.form.setValue({
        fecha: this.data.solicitud.fecha,
        ruta: this.data.solicitud.ruta,
        cite: this.data.solicitud.cite,
        referencia: this.data.solicitud.referencia,
        remitente: this.data.solicitud.remitente
      });
    }
  }

  setDate() {
    this.form.controls.fecha.setValue(new Date());
  }

  displayFn(remitente): string | undefined {
    return remitente ? remitente.nombre : undefined;
  }

  isValidRemitente(formControl: FormControl) {
    const objError = {
      invalidsender: true
    };
    if (formControl.value === null || typeof formControl.value === 'string') {
      return objError;
    }
    if (formControl.value.hasOwnProperty('id')) {
      return null;
    } else {
      return objError;
    }
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    const solicitud = Object.assign({}, this.form.value);
    solicitud.remitenteId = solicitud.remitente.id;
    solicitud.userId = 1;
    solicitud.estado = 1;
    this.loading = true;
    switch (this.data.action) {
      case 'register':
        this.save(solicitud);
        break;
      case 'edit':
        this.edit(solicitud);
        break;
      default:
        console.log('Fatal Error');
        break;
    }
  }

  eventRemitente($event: string) {
    this.selectedIndex = 0;
    this.form.controls.remitente.setValue($event);
  }

  save(solicitud: any) {
    this.solicitudServicie.register(solicitud)
      .then(data => {
        this.observerServicio.sendData('solicitud', data);
        this.myNgForm.resetForm();
        this.setDate();
        this.loading = false;
      })
      .catch(this.handlerError);
  }

  edit(solicitud: any) {
    solicitud.id = this.data.solicitud.id;
    this.solicitudServicie.update(solicitud, solicitud.id)
      .then(() => {
        this.dialogRef.close(solicitud);
      })
      .catch(this.handlerError);

  }

  handlerError(error) {
    return Promise.reject(error);
  }
}
