import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '../../../utils/format-date';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, type: string = 'normal'): any {
    return formatDate(value, type);
  }

}
