import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { settings } from '../../utils/settings';
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
  public loginErrors: any;
  public loading = false;
  public form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    /** Settings */
    this.storageService.setData('settings', JSON.stringify(settings));

    this.form =  this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    console.log('asdasd');
    if (this.form.invalid) {
      return;
    }
    const credential = Object.assign({}, this.form.value);
    this.loading = true;
    this.userService.login(credential)
      .then((data: any) => {
        this.storageService.setData('token', JSON.stringify(data));
        this.loginErrors = null;
        this.router.navigate(['dashboard/solicitud']);
      })
      .catch(err => {
        const { message } =  err.error;
        this.loginErrors = message;
        this.loading = false;
      });
  }

  register() {
    this.router.navigate(['register']);
  }

}
