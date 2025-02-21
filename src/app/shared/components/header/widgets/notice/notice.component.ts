import { Component, Input } from '@angular/core';
import { TopBarContent } from '../../../../interface/theme-option.interface';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-notice',
  standalone:true,
  imports:[SwiperModule],
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})

export class NoticeComponent {

  @Input() content: TopBarContent[] | undefined;

}
