import { Component, Input } from '@angular/core';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';


@Component({
    selector: 'app-theme-home-banner',
    templateUrl: './home-banner.component.html',
    styleUrls: ['./home-banner.component.scss'],
    standalone: true,
    imports: [ImageLinkComponent]
})
export class HomeBannerComponent {

  @Input() theme: string = 'paris';
  @Input() data?: any;
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("banner homme", this.data);
  }
}
