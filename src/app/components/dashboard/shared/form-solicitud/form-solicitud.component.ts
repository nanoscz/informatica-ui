import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  ) {
    this.txtSubmit = this.data.action === 'registrar' ? 'Guardar' : 'Modificar';
  }

  async ngOnInit() {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
      cite: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      remitente: [null, [Validators.required]],
    });
    this.setFecha();
    this.form.controls.remitente.valueChanges
      .subscribe((value: string) => {
        if (value !== null && value.length >= 4 ) {
          this.remitenteService.findAll(value)
          .then((results: any) => {
            this.remitentes = results.remitentes
          })
        }
      });
  }

  setFecha() {
    this.form.controls.fecha.setValue(new Date())
  }

  displayFn(remitente): string | undefined {
    return remitente ? remitente.nombre : undefined;
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    const solicitud = Object.assign({}, this.form.value);
    solicitud.remitenteId = solicitud.remitente.id
    solicitud.userId = 1
    solicitud.estado = 1
    this.loading = true
    switch (this.data.action) {
      case 'registrar':
          this.guardar(solicitud);
          break;
      case 'modificar':
          this.modificar(solicitud);
          break;
      default:
        console.log('Fatal Error');
        break;
    }
  }

  guardar(solicitud: any) {
    this.solicitudServicie.register(solicitud)
      .then(solicitud => {
        this.observerServicio.enviarDatos('solicitud', solicitud);
        this.myNgForm.resetForm();
        this.setFecha();
        this.loading = false;
      })
  }

  modificar(solicitud: any) {

    this.loading = false;
  }
  
}
