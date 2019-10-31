import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public nameSystem = 'Sistema de Informática';
  public textInformation = `Crea la cuenta y contactate con el administrador del
      sistema para que te habilite la cuenta.`;
  public btnRegister = 'Crear cuenta';
  public btnLogin = 'Iniciar sesión';
  public loading = false;
  public form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form =  this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    const credential = Object.assign({}, this.form.value);
    this.loading = true;
    setTimeout(() => {
      console.log(credential);
      this.router.navigate(['dashboard/solicitud']);
    }, 3000);
  }

  register() {

  }

}
