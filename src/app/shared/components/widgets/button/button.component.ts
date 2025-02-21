import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoaderState } from '../../../state/loader.state';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [NgClass, AsyncPipe]
})
export class ButtonComponent {

  @Input() class: string = 'btn btn-animation w-100 justify-content-center';
  @Input() iconClass: string | null;
  @Input() id: string;
  @Input() label: string;
  @Input() type:  string  = 'submit';
  @Input() spinner:  boolean = true;
  @Input() disabled: boolean = false;

  public buttonId: string | null;

  spinnerStatus$: Observable<boolean> = inject(Store).select(LoaderState.buttonSpinner) as Observable<boolean>;

  constructor() {
    this.spinnerStatus$.subscribe(res => {
      if(res == false) {
        this.buttonId = null;
      }
    });
  }

  public onClick(id: string) {
    this.buttonId = id;
  }

}
