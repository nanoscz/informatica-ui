import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicios'
})
export class ServiciosPipe implements PipeTransform {
  servicios = [
    { id: 1, nombre: 'sistemas', pref: 'ing' },
    { id: 2, nombre: 'redes y telecomunicaciones', pref: 'ing' },
    { id: 3, nombre: 'servicio tecnico', pref: 'tec' },
    { id: 4, nombre: 'archivo', pref: 'arch' },
    { id: 5, nombre: 'secretaria', pref: 'sec'},
  ];
  transform(id: number, ...args: any[]): any {
    const servicio = this.servicios.filter(item => item.id === id);
    return servicio[0].nombre;
  }

}
