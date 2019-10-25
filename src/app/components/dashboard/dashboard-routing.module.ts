import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PersonalComponent } from './components/personal/personal.component';
import { DashboardComponent } from './dashboard.component';
import { ListComponent } from './shared/list/list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'solicitud', component: SolicitudComponent, data: { title: 'solicitud' },
        children: [
          {
            path: ':id', component: ListComponent, data: { title: 'solicitud' }
          },
          {
            path: '', redirectTo: '/dashboard/solicitud/1', pathMatch: 'full'
          },
        ]
      },
      {
        path: 'reportes', component: ReportesComponent, data: { title: 'reportes' }
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
