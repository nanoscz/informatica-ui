import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  private baseUrl = 'http://localhost:3001';
  transform(image: any, ...args: any[]): any {
    console.log(`${this.baseUrl}${image}`);
    return `${this.baseUrl}/${image}`;
  }

}
