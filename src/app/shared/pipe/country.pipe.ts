import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
