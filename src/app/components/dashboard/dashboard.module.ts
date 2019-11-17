import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';

import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { PersonalComponent } from './components/personal/personal.component';
import { ReportesComponent } from './components/reportes/reportes.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ExpandDirective } from './directives/expand.directive';
import { MaterialModule } from './material.module';
import { FormPersonalComponent } from './shared/form-personal/form-personal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './shared/search/search.component';
import { ServiciosPipe } from './pipes/servicios.pipe';
import { ListSolicitudComponent } from './shared/list-solicitud/list-solicitud.component';
import { ZfillPipe } from './pipes/zfill.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormSolicitudComponent } from './shared/form-solicitud/form-solicitud.component';
import { FormRemitenteComponent } from './shared/form-remitente/form-remitente.component';
import { DetailSolicitudComponent } from './shared/detail-solicitud/detail-solicitud.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { SliceTextPipe } from './pipes/slice-text.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadComponent } from './shared/upload/upload.component';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SolicitudComponent,
    ReportesComponent,
    PersonalComponent,
    FormPersonalComponent,
    ListSolicitudComponent,
    FormSolicitudComponent,
    FormRemitenteComponent,
    ExpandDirective,
    SearchComponent,
    ServiciosPipe,
    CapitalizePipe,
    ZfillPipe,
    DetailSolicitudComponent,
    ProfileComponent,
    FormatDatePipe,
    SliceTextPipe,
    UploadComponent
  ],
  entryComponents: [FormPersonalComponent, FormSolicitudComponent, DetailSolicitudComponent, UploadComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFontAwesomeModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule
  ]
})
export class DashboardModule { }
