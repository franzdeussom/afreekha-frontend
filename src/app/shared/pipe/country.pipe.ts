import { inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CountryState } from '../state/country.state';
import { StateState } from '../state/state.state';

@Pipe({
  name: 'country',
  standalone: true
})
export class CountryPipe implements PipeTransform {
  countries$: Observable<any> = inject(Store).select(CountryState.countries);

  transform(value: any, args?: any): any {
    let final = "";
    if (value) {
      this.countries$.subscribe((country)=>{
        let index = country.findIndex((pays: any)=> pays.value == Number.parseInt(value));
        
        final = country[index].label;
      
     });
     
     return final;
    }
    return final;
  }

}
