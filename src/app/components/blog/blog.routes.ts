import { Routes } from '@angular/router';
import { BlogResolver } from '../../shared/resolvers/blog.resolver';

import { ScrollPositionGuard } from '../../shared/guard/scroll.guard';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogComponent } from './blog.component';

export default [
  {
    path: 'blogs',
    component: BlogComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'blog/:slug',
    component: BlogDetailsComponent,
    resolve: {
      data: BlogResolver
    },
    canActivate: [ScrollPositionGuard],
  }
] as Routes;
