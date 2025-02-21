import { Component, Input } from '@angular/core';
import { NewsLetter } from '../../../../shared/interface/theme.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss'],
    standalone: true,
    imports: [NgStyle, ReactiveFormsModule, FormsModule, ButtonComponent, TranslateModule]
})
export class NewsletterComponent {

  @Input() data: NewsLetter | null;
  @Input() style: string = 'basic';
}
