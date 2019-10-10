import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [
  MatToolbarModule,
  MatButtonModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
