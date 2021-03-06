import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';
import { AsignarService } from '../../services/asignar.service';
/** Libraries PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
/** format date */
import { formatDate } from '../../../../utils/format-date';
/** format text */
import { TitleCase, UpperCase } from 'src/app/utils/format-text';

@Component({
  selector: 'app-detail-solicitud',
  templateUrl: './detail-solicitud.component.html',
  styleUrls: ['./detail-solicitud.component.scss']
})
export class DetailSolicitudComponent implements OnInit {
  public form: FormGroup;
  public modeEdit = false;
  public personals: any = [];
  public assignedPersonal: any = [];
  public textNotAssigned = 'No se le ha asignado un personal a esta solicitud.';
  constructor(
    private asignarService: AsignarService,
    private perosnalService: PersonalService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetailSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      personals: ''
    });
    this.getPersonal();
    this.getAssignedPersonal();
  }

  getPersonal() {
    this.perosnalService.findAll('', '0-100')
      .then((dataReceived: any) => {
        this.personals = dataReceived.personals;
      })
      .catch(err => console.log(err));
  }

  getAssignedPersonal() {
    const solicitudId = this.data.solicitud.id;
    this.asignarService.findBySolicitud(solicitudId)
      .then((dataReceived: any) => {
        this.assignedPersonal = dataReceived.assignedPersonal;
        const assigned = this.assignedPersonal.map((personal: any) => personal.id);
        this.form.controls.personals.setValue(assigned);
      })
      .catch(err => console.log(err));
  }

  changeMode() {
    this.modeEdit = !this.modeEdit;
  }

  filterData(firstArray, secondArray) {
    return firstArray.filter((item: any) => secondArray.indexOf(item) === -1);
  }

  formatData(firstArray) {
    const solicitudId = this.data.solicitud.id;
    const asignar = firstArray.map((personalId: number) => {
      return {
        solicitudId,
        personalId
      };
    });
    return asignar;
  }

  async submit() {
    const { personals } = this.form.value;
    const assignedPersonals = this.assignedPersonal.map(item => item.id);
    if (personals.length === 0 && assignedPersonals.length === 0) {
      this.changeMode();
      return;
    }
    let assigned = [];
    let newAssigned = [];
    assigned = this.formatData(assignedPersonals);
    newAssigned = this.formatData(personals);
    await this.deleteAssigned(assigned);
    await this.saveAssigned(newAssigned);
    this.getAssignedPersonal();
    this.changeMode();
  }

  saveAssigned(assigned: any) {
    return this.asignarService.create(assigned);
  }

  deleteAssigned(assigned: any) {
    const PromiseArray = [];
    for (const a of assigned) {
      const deleteAssign = this.asignarService.delete(a.solicitudId, a.personalId);
      PromiseArray.push(deleteAssign);
    }
    return Promise.all(PromiseArray);
  }

  getPersonalAssignedLiteral() {
    let personal = this.assignedPersonal.map(item => TitleCase(item.fullName));
    personal = `${personal.join(', ')}.`;
    return personal;
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  async print() {
    const textsg = `Seguimiento a realizar:`;
    const date = new Date();
    const year = date.getFullYear();
    const solicitud = this.data.solicitud;
    const dateSolicitud = formatDate(solicitud.fecha);
    const _ = `      `;
    const docDefinition = {
      content: [
        {
          columns: [
            {
              alignment: 'left',
              image: await this.getBase64ImageFromURL('/assets/logo.png'),
              width: 60
            },
            {
              alignment: 'left',
              style: 'stack',
              stack: [
                {
                  style: 'titleSystem',
                  alignment: 'center',
                  text: 'CPS - SISTEMAS'
                },
                {
                  style: 'h1',
                  alignment: 'center',
                  bold: true,
                  text: 'CAJA PETROLERA DE SALUD'
                },
                {
                  style: 'h2',
                  alignment: 'center',
                  bold: true,
                  text: 'REGIONAL SANTA CRUZ'
                },
                {
                  style: 'h3',
                  alignment: 'center',
                  bold: true,
                  text: 'HOJA DE RUTA'
                },
              ]
            }
          ]
        },
        {
          alignment: 'center',
          table: {
            widths: [30, '*', '*'],
            body: [
              ['N°', solicitud.ruta, dateSolicitud],
            ]
          }
        },
        {
          alignment: 'left',
          style: 'table',
          table: {
            widths: ['*', '*'],
            heights: [70, '*'],
            body: [
              [`De: Ing. Rosmery Callejas Salguero
                ${UpperCase('Jefe Unidad Tecnología Informática')}`,
                `A: ${this.getPersonalAssignedLiteral()}`],
              [`Atencion a nota Cite : ${UpperCase(solicitud.cite)}`, `FECHA:`]
            ]
          }
        },
        {
          alignment: 'left',
          style: 'table',
          table: {
            heights: ['*', 10, 70, '*'],
            widths: ['*'],
            body: [
              [`Referencia : ${UpperCase(solicitud.referencia)}`],
              [`Su gentil atención para:`],
              [``],
              ['Nota: Se adjunta nota de respaldo']
            ]
          }
        },
        {
          style: 'subheader',
          alignment: 'center',
          text: 'FIRMA DE RECEPCION'
        },
        {
          alignment: 'left',
          style: 'table',
          table: {
            widths: ['*', '*', '*'],
            heights: [70, 10],
            body: [
              ['', '', ''],
              [`Fecha:${_}/${_}/${year}`, `Fecha:${_}/${_}/${year}`, `Fecha:${_}/${_}/${year}`]
            ]
          }
        },
        {
          alignment: 'left',
          style: 'tablesg',
          table: {
            widths: ['*', '*', '*'],
            heights: [10, 70],
            body: [
              [`${textsg}${_}/${_}/${year}`, `${textsg}${_}/${_}/${year}`, `${textsg}${_}/${_}/${year}`],
              ['', '', ''],
            ]
          }
        },
        {
          style: 'autor',
          text: `MJCV/ ${year}`
        },
        {
          style: 'date',
          alignment: 'center',
          text: `Santa Cruz, ${formatDate(new Date(), 'literal')}`
        }
      ],
      styles: {
        titleSystem: {
          bold: true,
          fontSize: 8,
          margin: [0, 0, 0, 20]
        },
        h1: {
          fontSize: 17,
        },
        h2: {
          fontSize: 13,
        },
        h3: {
          bold: true,
          fontSize: 11,
          margin: [0, 10, 0, 40]
        },
        title: {
          fontSize: 12,
        },
        autor: {
          fontSize: 12,
          bold: true,
          margin: [0, 40, 0, 0]
        },
        table: {
          fontSize: 10,
          margin: [0, 10, 0, 0]
        },
        tablesg: {
          fontSize: 9,
          margin: [0, 10, 0, 0]
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 5]
        },
        date: {
          fontSize: 10
        },
        stack: {
          margin: [-60, 0, 0, 0]
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
