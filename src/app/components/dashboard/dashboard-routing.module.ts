import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PersonalComponent } from './components/personal/personal.component';
import { DashboardComponent } from './dashboard.component';
import { ListSolicitudComponent } from './shared/list-solicitud/list-solicitud.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'solicitud', component: SolicitudComponent, data: { title: 'solicitud' },
        children: [
          {
            path: ':id', component: ListSolicitudComponent, data: { title: 'solicitud' }
          },
          {
            path: '', redirectTo: '/dashboard/solicitud/1', pathMatch: 'full'
          },
        ]
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'reportes', component: ReportesComponent, data: { title: 'Reportes' }
      },
      {
        path: 'personal', component: PersonalComponent, data: { title: 'personal' }
      },
      {
        path: '', redirectTo: '/dashboard/solicitud', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
