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
        path: 'solicitud', component: SolicitudComponent, data: { title: 'solicitud'}
      },
      {
        path: 'reportes', component: ReportesComponent, data: { title: 'reportes'}
      },
      {
        path: 'personal', component: PersonalComponent, data: { title: 'personal'}
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
