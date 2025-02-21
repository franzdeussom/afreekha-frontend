import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-footer-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})

export class SocialLinksComponent {

  @Input() data: Option | null;

}
