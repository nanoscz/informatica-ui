import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RemitenteService } from '../../services/remitente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-remitente',
  templateUrl: './form-remitente.component.html',
  styleUrls: ['./form-remitente.component.scss']
})
export class FormRemitenteComponent implements OnInit {
  @Output() eventRemitente =  new EventEmitter();
  public title = 'Register Remitente';
  public form: FormGroup;
  constructor(
    private remitenteService: RemitenteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      servicio: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const remitente =  Object.assign({}, this.form.value);
    this.remitenteService.register(remitente)
      .then((data) => {
        this.eventRemitente.emit(data);
      })
      .catch(this.handlerError);
  }

  handlerError(error) {
    console.error(error.message);
    Promise.reject(error);
  }
}
