import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../../../widgets/button/button.component';

@Component({
    selector: 'app-navbar-menu-button',
    templateUrl: './navbar-menu-button.component.html',
    styleUrls: ['./navbar-menu-button.component.scss'],
    standalone: true,
    imports: [ButtonComponent]
})
export class NavbarMenuButtonComponent {

  @Output() activeMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean;

  public active: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.active = changes['show']?.currentValue
  }

  toggleMenu(){
    this.active = !this.active;
    this.activeMenu.emit(this.active);
  }
}
