import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { Footer } from '../../interface/theme.interface';
import { AsyncPipe } from '@angular/common';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [BasicFooterComponent, AsyncPipe]
})

export class FooterComponent {

  @Input() footer: Footer;

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;


}
