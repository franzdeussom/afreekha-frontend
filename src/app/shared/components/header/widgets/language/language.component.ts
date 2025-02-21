import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, ButtonComponent]
})

export class LanguageComponent {

  @Input() style: string = 'basic';

  public active: boolean = false;
  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      icon: 'us'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    },
  ]

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    icon: 'us'
  }

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      let language = localStorage.getItem("language");
  
      if(language == null){
        localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
        this.translate.use(this.selectedLanguage.code);
      }else{
        this.selectedLanguage = JSON.parse(language);
        this.translate.use(this.selectedLanguage.code);
      }
    }
  }

  selectLanguage(language: any){
    this.active = false;
    this.translate.use(language.code);
    this.selectedLanguage = language;
    localStorage.setItem("language", JSON.stringify(this.selectedLanguage));
  }

  openDropDown(){
    this.active = !this.active;
  }


  hideDropdown(){
    this.active = false;
  }

}
