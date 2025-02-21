import { Component, Input } from '@angular/core';
import { Blog } from '../../../../shared/interface/blog.interface';
import { RouterLink } from '@angular/router';
import { SlicePipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-recent-post',
    templateUrl: './recent-post.component.html',
    styleUrls: ['./recent-post.component.scss'],
    standalone: true,
    imports: [RouterLink, SlicePipe, DatePipe]
})
export class RecentPostComponent {

  @Input() blogs: Blog[];

  constructor(){}

}
