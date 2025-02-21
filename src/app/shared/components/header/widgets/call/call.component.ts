import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})

export class CallComponent {

  @Input() data: Option | null;
  @Input() style: string = 'basic';
  
}
