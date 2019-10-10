import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PersonalComponent } from './components/personal/personal.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'solicitud', component: SolicitudComponent
      },
      {
        path: 'reportes', component: ReportesComponent
      },
      {
        path: 'personal', component: PersonalComponent
      },
      { 
        path: '', redirectTo: '/dashboard/personal', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }