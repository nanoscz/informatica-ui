import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public bntRegister = 'Register';
  public btnCancel = 'Cancel';
  public nameSystem = 'Sistema de Informática';
  public textInformation = `Crea la cuenta y contactate con el administrador del
  sistema para que te habilite la cuenta.`;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form =  this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      this.checkPasswords.bind(this)
    ]);
  }

  checkPasswords(formControl: FormControl) {
    const pass = this.form.controls.password.value;
    const confirmPass = formControl.value;
    return pass === confirmPass ? null : { notMatch: true };
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const user = Object.assign({}, this.form.value);
    this.userService.register(user)
      .then((data: any) => {
        console.log(data);
        this.router.navigate(['dashboard/solicitud']);
      })
      .catch(err => {
        console.error(err);
        setTimeout(() => {
          this.loading = false;
        }, 1200);
      });
  }

  cancel() {
    this.router.navigate(['login']);
  }
}
