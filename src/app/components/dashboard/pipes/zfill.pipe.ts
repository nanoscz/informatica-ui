import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zfill'
})
export class ZfillPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return this.zfill(value, 5);
  }

  zfill(number, width) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";

    if (width <= length) {
      if (number < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }
}
