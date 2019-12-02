import { NgModule } from '@angular/core';

import { FormatDatePipe } from './format-date.pipe';
import { SliceTextPipe } from './slice-text.pipe';
import { ServiciosPipe } from './servicios.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { ZfillPipe } from './zfill.pipe';

const PIPES = [
  FormatDatePipe,
  SliceTextPipe,
  ServiciosPipe,
  CapitalizePipe,
  ZfillPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class DashboardPipesModule { }
