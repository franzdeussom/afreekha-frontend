import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MobileMenu } from '../../../../../shared/interface/menu.interface';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class MobileMenuComponent {
  language: string = '';

  public menuItem: MobileMenu[] =[]

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){
    this.language = this.getInitialLanguage();
    this.menuItem = this.initMenu();
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuItem?.forEach((menu: MobileMenu) => {
          menu.active = false;
          if((event.url.split("?")[0].toString()) === menu.path){
            menu.active = true;
          }
        })
      }
    })

  }
  initMenu(): any[]{
    return  [
      {
        id: 1,
        active: true,
        title: this.language === 'fr' ? 'Accueil' : 'Home',
        icon: 'ri-home-2',
        path: '/'
      },
      {
        id: 2,
        active: false,
        title: this.language === 'fr' ? 'Catégories' : 'Category',
        icon: 'ri-apps-line js',
        path: '/collections'
      },
      {
        id: 3,
        active: false,
        title: this.language === 'fr' ? 'Recherche' : 'Search',
        icon: 'ri-search-2',
        path: '/search'
      },
      {
        id: 4,
        active: false,
        title: this.language === 'fr' ? 'Favoris' : 'Favorites',
        icon: 'ri-heart-3',
        path: '/wishlist'
      },
      {
        id: 5,
        active: false,
        title: this.language === 'fr' ? 'Panier' : 'Cart',
        icon: 'fly-cate ri-shopping-bag',
        path: '/cart'
      }
    ]
  }
  private getInitialLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage ? JSON.parse(storedLanguage).code : 'en';
    }
    return 'en'; // Fallback pour le serveur
  }

  activeMenu(menu: MobileMenu){
    this.menuItem.forEach(item => {
      this.menuItem.includes(menu)
      item.active  = false;
    })
    menu.active = !menu.active
  }
}
