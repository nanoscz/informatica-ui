import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(value: string, long: number): any {
    if (value.length > long) {
      value = `${value.slice(0, long)}...`;
    }
    return value;
  }

}
