import { Pipe, PipeTransform } from '@angular/core';
import { formatData } from '../../../utils/dayjs';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, type: string = 'normal'): any {
    return formatData(value, type);
  }

}
