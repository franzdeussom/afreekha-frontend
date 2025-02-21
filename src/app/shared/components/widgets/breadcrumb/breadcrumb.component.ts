import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../../interface/breadcrumb';
import { TitleCasePipe } from '../../../pipe/title-case.pipe';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    standalone: true,
    imports: [RouterLink, TitleCasePipe]
})
export class BreadcrumbComponent {

  @Input() breadcrumb: Breadcrumb | null;

}
