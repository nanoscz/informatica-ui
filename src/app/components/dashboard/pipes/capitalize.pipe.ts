import { Pipe, PipeTransform } from '@angular/core';
import { Capitalize } from 'src/app/utils/format-text';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return Capitalize(value);
  }

}
