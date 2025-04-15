import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    return null;
  }

}
