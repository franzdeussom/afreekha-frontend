import { Component, Input } from '@angular/core';
import { Category } from '../../../../shared/interface/category.interface';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-blog-category',
    templateUrl: './blog-category.component.html',
    styleUrls: ['./blog-category.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, RouterLink]
})
export class BlogCategoryComponent {

  @Input() data: Category[];

}
