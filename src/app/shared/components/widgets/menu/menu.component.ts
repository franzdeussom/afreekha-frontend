import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Menu } from '../../../interface/menu.interface';
import { ProductState } from '../../../../shared/state/product.state';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { BlogState } from '../../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';
import * as data from '../../../../shared/data/menu'
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet, NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, NgClass, RouterLink, ProductBoxComponent, DatePipe, TranslateModule]
})
export class MenuComponent {

  product$: Observable<Product[]> = inject(Store).select(ProductState.dealProducts);
  blog$: Observable<BlogModel> = inject(Store).select(BlogState.blog);

  public menu: Menu[] = data.menu;
  public products: Product[];
  public blogs: Blog[];

  constructor(){
    this.product$.subscribe(product => {
      if(product) {
        this.products = product.slice(0, 2);
      }
    })

    this.blog$.subscribe(blog =>{
      if(blog && blog.data) {
        this.blogs = blog.data.slice(0,2)
      }
    })
  }

  toggle(menu: Menu){
    if(!menu.active){
      this.menu.forEach(item => {
        if(this.menu.includes(menu)){
          item.active = false;
        }
      })
    }
    menu.active = !menu.active;
  }
}
