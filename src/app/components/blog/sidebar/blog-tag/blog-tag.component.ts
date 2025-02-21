import { Component, Input } from '@angular/core';
import { Tag } from '../../../../shared/interface/tag.interface';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-blog-tag',
    templateUrl: './blog-tag.component.html',
    styleUrls: ['./blog-tag.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class BlogTagComponent {

  @Input() tags: Tag[];
  
  constructor(){}

}
