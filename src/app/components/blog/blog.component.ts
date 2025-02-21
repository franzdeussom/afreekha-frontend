import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BlogService } from '../../shared/services/blog.service';
import { ThemeOptionState } from '../../shared/state/theme-option.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetBlogs } from '../../shared/action/blog.action';
import { BlogState } from '../../shared/state/blog.state';
import { BlogModel } from '../../shared/interface/blog.interface';
import { Option } from '../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { SummaryPipe } from '../../shared/pipe/summary.pipe';
import { BlogSidebarComponent } from './sidebar/sidebar.component';
import { NoDataComponent } from '../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../shared/components/widgets/pagination/pagination.component';
import { SkeletonBlogComponent } from './skeleton-blog/skeleton-blog.component';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-blogs',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, SkeletonBlogComponent, NgClass, RouterLink, PaginationComponent, NoDataComponent, BlogSidebarComponent, AsyncPipe, DatePipe, SummaryPipe, TranslateModule]
})
export class BlogComponent {

  blog$: Observable<BlogModel> = inject(Store).select(BlogState.blog) as Observable<BlogModel>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Blogs",
    items: []
  }

  public filter = {
    'page': 1, // Current page number
    'paginate': 50, // Display per page,
    'status': 1,
    'category': '',
    'tag': ''
  };

  public totalItems: number = 0;
  public skeletonItems = Array.from({ length: 9 }, (_, index) => index);

  public style: string;
  public sidebar: string = 'left_sidebar';

  constructor(private store: Store, private route: ActivatedRoute,
    public blogService: BlogService) {
    this.route.queryParams.subscribe(params => {
      this.filter.category = params['category'] ? params['category'] : '';
      this.filter.tag = params['tag'] ? params['tag'] : ''

      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter.category ? `Blogs: ${this.filter.category.replaceAll('-', ' ')}` :
              this.filter.tag ? `Blogs: ${this.filter.tag.replaceAll('-', ' ')}` : 'Blogs';
      this.breadcrumb.items.push({ label: 'Blogs', active: true });

      this.store.dispatch(new GetBlogs(this.filter));

      // For Demo Purpose only
      if(params['style']) {
        this.style = params['style'];
      }

      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      }

      if(!params['style'] && !params['sidebar']) {
        // Get Blog Layout
        this.themeOption$.subscribe(theme => {
          this.style = theme?.blog?.blog_style;
          this.sidebar = theme?.blog.blog_sidebar_type;
        });
      }

    });
    this.blog$.subscribe(blog => this.totalItems = blog?.total);
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetBlogs(this.filter));
  }

}
