import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class SearchBoxComponent {

  @Input() style: string = 'basic';
  
}
