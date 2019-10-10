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

@NgModule({
  declarations: [
    DashboardComponent,
    SolicitudComponent,
    ReportesComponent,
    PersonalComponent,
    ExpandDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularFontAwesomeModule,
    MaterialModule
  ]
})
export class DashboardModule { }
