import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public textInformation = `Crea la cuenta y contactate con el administrador del
      sistema para que te habilite la cuenta.`;
  public btnRegister = 'Crear cuenta';
  public btnLogin = 'Iniciar sesión';
  public loading = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard/solicitud']);
    }, 3000);
  }

  register() {

  }

}
