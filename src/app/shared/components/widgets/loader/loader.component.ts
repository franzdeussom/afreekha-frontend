import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class LoaderComponent {
  
  @Input() loaderClass: string = 'loader-wrapper';

}
