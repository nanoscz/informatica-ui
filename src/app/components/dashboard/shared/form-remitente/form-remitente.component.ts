import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-remitente',
  templateUrl: './form-remitente.component.html',
  styleUrls: ['./form-remitente.component.scss']
})
export class FormRemitenteComponent implements OnInit {
  public title:string = 'Register Remitente'
  constructor() { }

  ngOnInit() {
  }

}
