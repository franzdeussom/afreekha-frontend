import { inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateState } from '../state/state.state';

@Pipe({
  name: 'state',
  standalone: true
})
export class StatePipe implements PipeTransform {
  states$: Observable<any> = inject(Store).select(StateState.state);

  transform(value: any, ...args: unknown[]): unknown {
    let final = "";
    console.log('value', value)

    if(value){
      this.states$.subscribe((state)=>{
        console.log('states', state);

        let  index = state.data.findIndex((st: any)=> st.id == Number.parseInt(value));
        final = state.data[index].name;
        console.log('state final', final);
        return final;
      });
    }
   
    return final;
  }

}
