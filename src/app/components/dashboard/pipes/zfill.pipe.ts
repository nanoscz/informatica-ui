import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zfill'
})
export class ZfillPipe implements PipeTransform {

  transform(ruta: number): string {
    return this.zfill(ruta, 5);
  }

  zfill(value: number, width: number) {
    const valueOutput = Math.abs(value);
    const length = value.toString().length;
    const zero = '0';

    if (width <= length) {
      if (value < 0) {
        return ('-' + valueOutput.toString());
      } else {
        return valueOutput.toString();
      }
    } else {
      if (value < 0) {
        return ('-' + (zero.repeat(width - length)) + valueOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + valueOutput.toString());
      }
    }
  }
}
